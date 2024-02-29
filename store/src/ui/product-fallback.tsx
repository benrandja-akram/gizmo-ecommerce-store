import { clsx } from '@/utils/clsx'

function ProductFallback({ size = 'base' }: { size?: 'base' | 'sm' }) {
  return (
    <div
      className={clsx(
        'flex items-center p-3',
        size === 'base' ? 'h-[120px]' : 'h-[64px]',
      )}
    >
      <div className="flex flex-1 animate-pulse space-x-4">
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
