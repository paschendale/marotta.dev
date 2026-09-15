---
title: "Migrating n8n from 1.x to 2.x without breaking shell-based pipelines"
description: "A practical guide to the n8n 2.x defaults that quietly disable shell, file and env access — and the env vars that restore n8n 1.x behavior."
date: "2026-09-14"
slug: "why-platform-major-version-upgrades-break-automation-nobody"
coverImage: "/blog/why-platform-major-version-upgrades-break-automation-nobody/cover.svg"
author: "victor-marotta"
tags:
  - "n8n"
  - "automation"
  - "migration-guide"
  - "devops"
  - "geospatial"
---

## The model n8n 1.x let you build on

If your n8n workflows only call APIs and move JSON around, you can skip this one. But if you built anything on n8n 1.x that shells out to command-line tools, reads environment variables to configure a runtime, or writes to arbitrary paths on disk, you built it on an execution model that n8n 2.x no longer assumes by default — and the upgrade will not tell you that in a way you'll notice before production.

I run a custom n8n image across several client deployments that bundles real geospatial tooling — QGIS, PDAL, tippecanoe, LiDAR processing binaries, an object-storage client — baked directly into the container. The workflows aren't calling a REST API to reproject a file or generate map tiles; they're shelling out to the actual CLI tools, reading input from mounted volumes, writing output back to disk or object storage, and in some workflows importing GIS libraries inside a Code node that needs the container's Python environment. That only works because n8n 1.x ran everything in-process, in the same container, with the same filesystem and environment as anything else running there. No sandboxing, no permission model beyond the container itself.

That's the assumption to check before any 1.x-to-2.x migration: does your pipeline's whole value depend on capabilities n8n 1.x granted for free, with no toggle to turn them on?

## What changes by default in n8n 2.x

n8n 2.x ships with a safer execution model, and for most users that's the right call. Four defaults changed that matter specifically if you depend on shell, file or environment access:

- **Task runners are on by default.** Code and script execution moves out of the main n8n process into a separate, sandboxed runner. That runner does not inherit the main container's environment the same way — including things like a `PYTHONPATH` pointing at GIS library bindings. A workflow that used to import a geospatial library without issue can start failing with an import error that has nothing to do with your code.
- **The Execute Command node is disabled by default.** If any part of your automation runs a binary with arguments, that node — and the node-exclusion list controlling it — now needs to be explicitly re-enabled.
- **Code nodes lose direct environment access.** Anything that read an environment variable inside a Code step to configure behavior at runtime now gets nothing, silently, unless you opt back in.
- **File access gets locked to a restricted path.** Workflows that read or wrote to mounted volumes outside n8n's own data directory — a very normal pattern for a pipeline moving files between storage and processing steps — will start failing on paths that used to work.

None of these show up as a headline breaking change. They show up as a workflow that runs, produces no obvious error, and silently does the wrong thing — or fails with a message that reads like a bug in your code rather than a platform default.

## The migration checklist: env vars that restore 1.x behavior

For a pipeline that depends on shell, file and environment access the way 1.x allowed, this is the set of environment variables to set explicitly before you point production traffic at n8n 2.x:

```
N8N_RUNNERS_ENABLED=false
N8N_ENABLE_EXECUTE_COMMAND=true
NODES_EXCLUDE=[]
N8N_BLOCK_ENV_ACCESS_IN_NODE=false
N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES=false
N8N_RESTRICT_FILE_ACCESS_TO=
```

A few of these deserve a note, because the reasoning matters more than the flag name:

- `N8N_RUNNERS_ENABLED=false` is the one to get right first. It's tempting to leave runners on and just configure them, but a sandboxed runner running in its own interpreter will not inherit a carefully built environment — conda paths, library bindings, anything set up specifically for the container. Disabling runners keeps Code and Execute Command execution in-process, against the container's real filesystem and environment, matching how 1.x worked.
- `N8N_ENABLE_EXECUTE_COMMAND=true` and `NODES_EXCLUDE=[]` both need to be set — they're two separate gates on the same node, and setting only one leaves it disabled.
- `N8N_RESTRICT_FILE_ACCESS_TO=` combined with `N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES=false` is the pair that restores unrestricted file access; setting only one still leaves paths blocked.

Worth checking separately: n8n 2.x minor releases have moved the minimum required Node.js version more than once during the 2.x line's early releases. That's not a flag you can set — it's a base image check to run before you deploy, not after something fails silently at container startup.

## Where to get these numbers instead of guessing

The env vars above didn't come from reading the release notes carefully enough — release notes tell you a default changed, not which flag reverses it or how the flags interact. What settled it was comparing against a separate, already-running n8n 2.x deployment for an unrelated workload, and reading its configuration line by line. That's the actual method, not "search until you find a blog post": if you have any real 2.x deployment already running anywhere, treat its working configuration as more reliable than the documentation, and diff it against your assumptions before you guess.

## What this means if you're planning a similar migration

Before moving any orchestration platform across a major version when your workflows are CLI-tool-heavy rather than API-heavy:

- List every non-default capability your workflows use: shell execution, direct environment reads, file paths outside the platform's own data directory, custom interpreters.
- For each one, find the specific flag that restores it in the new version — don't assume a single "compatibility mode" switch covers all of them.
- Test the actual commands and file operations your pipeline runs, not just that the platform starts. A clean startup log tells you nothing about whether your Execute Command node still executes or your Code node can still see the interpreter you configured.
- Treat a real running deployment on the new version, even for a completely different project, as a better source of truth than the docs.

The upgrade itself isn't the risk. Treating a major version bump as a drop-in replacement, when your whole pipeline runs on capabilities the platform now treats as opt-in exceptions, is.
