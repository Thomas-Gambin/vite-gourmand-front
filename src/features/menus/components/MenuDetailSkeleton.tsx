export function MenuDetailSkeleton() {
  return (
    <div className="mt-10 animate-pulse lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12">
      <div className="aspect-[5/4] rounded-[1.75rem] bg-surface-muted" />
      <div className="mt-10 space-y-5 rounded-[1.75rem] border border-border/40 bg-surface-muted/50 p-8 lg:mt-0">
        <div className="flex gap-2">
          <div className="h-6 w-20 rounded-full bg-surface-muted" />
          <div className="h-6 w-16 rounded-full bg-surface-muted" />
        </div>
        <div className="h-10 w-4/5 rounded-xl bg-surface-muted" />
        <div className="h-4 w-full rounded-lg bg-surface-muted" />
        <div className="h-4 w-3/4 rounded-lg bg-surface-muted" />
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="h-20 rounded-2xl bg-surface-muted" />
          <div className="h-20 rounded-2xl bg-surface-muted" />
          <div className="h-20 rounded-2xl bg-surface-muted" />
        </div>
        <div className="h-12 rounded-full bg-surface-muted" />
      </div>
    </div>
  )
}
