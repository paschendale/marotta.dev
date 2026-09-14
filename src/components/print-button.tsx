"use client";

import { Button } from "@/components/ui/button";

export default function PrintButton({ label }: { label: string }) {
  return (
    <Button
      variant="outline"
      className="transition-transform hover:scale-105"
      onClick={() => window.print()}
    >
      {label}
    </Button>
  );
}
