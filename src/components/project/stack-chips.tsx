export default function StackChips({ items, limit, className = "" }: { items: string[]; limit?: number; className?: string }) {
  const shown = limit ? items.slice(0, limit) : items;
  const rest = limit ? items.length - shown.length : 0;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {shown.map((s) => (
        <li key={s} className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[0.7rem] text-secondary-foreground">
          {s}
        </li>
      ))}
      {rest > 0 && <li className="px-1 py-0.5 font-mono text-[0.7rem] text-muted-foreground">+{rest}</li>}
    </ul>
  );
}
