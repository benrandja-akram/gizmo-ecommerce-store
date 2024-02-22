import clsx from 'clsx'
import { MoveRightIcon } from 'lucide-react'
import Link from 'next/link'

function Category({ className, ...props }: DivProps) {
  return <div className={clsx('lg:w-8xl max-w-full  ', className)} {...props} />
}
function CategoryHeader({
  href,
  className,
  ...props
}: DivProps & {
  href?: string
}) {
  return (
    <div
      className={clsx('flex items-center justify-between', className)}
      {...props}
    >
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {props.children}
      </h2>
      {href && (
        <Link
          href={href}
          className="hidden items-center space-x-4 text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:flex"
        >
          <span>See everything</span>
          <MoveRightIcon aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

function CategoryList({ className, ...props }: DivProps) {
  return (
    <div
      className={clsx('relative mt-8 w-full overflow-x-auto pb-6', className)}
      {...props}
    >
      <ul
        role="list"
        className="space grid items-center justify-center gap-10 sm:grid-cols-2 md:mx-0 md:gap-x-8 md:gap-y-8 lg:grid-cols-4"
      >
        {props.children}
      </ul>
    </div>
  )
}

export { Category, CategoryHeader, CategoryList }
