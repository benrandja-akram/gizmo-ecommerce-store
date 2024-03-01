export default function Loading() {
  return (
    <div className="grid items-start gap-x-8 gap-y-6 pt-8 lg:grid-cols-[220px_1fr] lg:gap-20">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {new Array(5).fill(null).map((_, i) => (
          <div key={i} className="h-5 rounded bg-slate-200" />
        ))}
      </div>
      <div className="grid gap-8">
        <div className="h-6 w-60 rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {new Array(12).fill(null).map((_, i) => (
            <div key={i} className="grid gap-2">
              <div className="aspect-square rounded-lg bg-slate-200" />
              <div className="mx-auto h-2 w-20 rounded bg-slate-200 sm:h-3" />
              <div className="h-2 rounded bg-slate-200 sm:h-3" />
              <div className="h-2 rounded bg-slate-200 sm:h-3" />
              <div className="mx-auto h-2 w-20 rounded bg-slate-200 sm:h-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
