function ProductFallback() {
  return (
    <div className="h-[140px] p-3">
      <div className="flex animate-pulse space-x-4">
        <div className="h-12 w-12 rounded-full bg-slate-200"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-200"></div>
              <div className="col-span-1 h-2 rounded bg-slate-200"></div>
            </div>
            <div className="h-2 rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProductFallback }