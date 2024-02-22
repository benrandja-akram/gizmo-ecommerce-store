import { getCategories } from '@/db/category'
import { Logo } from '@/ui/logo'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { MobileMenu } from './mobile-menu'

async function Header() {
  const categories = await getCategories()

  return (
    <header className="sticky top-0 z-10">
      <nav className="border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          {/* Logo (lg+) */}
          <div className="hidden space-x-4 lg:flex lg:items-center">
            <Link href="/" className="mr-12">
              <span className="sr-only">Your Company</span>
              <Logo width={28} height={28} />
            </Link>
            {categories.map((category) => {
              return (
                <Link
                  key={category.id}
                  href={`/#category-${category.id}`}
                  type="button"
                  className="flex-1 whitespace-nowrap border-b-2  border-transparent px-1 py-4 text-base font-medium  text-gray-700 transition-all hover:text-gray-900"
                >
                  {category.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu and search (lg-) */}
          <MobileMenu categories={categories} />
          {/* Logo (lg-) */}
          <Link href="/" className="lg:hidden">
            <span className="sr-only">Your Company</span>
            <Logo width={28} height={28} />
          </Link>

          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center space-x-4 lg:ml-8 lg:space-x-8">
              <a
                href="#"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </a>

              <div className="flow-root">
                <a href="#" className="group -m-2 flex items-center p-2">
                  <ShoppingCartIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    0
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
function TopBanner() {
  return (
    <div className="bg-gray-900">
      <div className=" px-4 py-2.5 sm:px-6 lg:px-8">
        <p className=" text-center text-sm font-medium text-white lg:flex-none">
          Call us on phone 0777558899
        </p>
      </div>
    </div>
  )
}
export { Header, TopBanner }
