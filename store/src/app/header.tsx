import { Button } from '@/components/atoms/button'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/atoms/dropdown'
import { Cart } from '@/components/ui/cart'
import { Logo } from '@/components/ui/logo'
import { db } from '@/db'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { Suspense } from 'react'
import { Search } from '../components/ui/search'
import { MobileMenu } from './mobile-menu'

async function Header() {
  const categories = await db.category.findMany({
    orderBy: { position: 'asc' },
  })

  return (
    <header className="sticky top-0 z-10">
      <nav className="border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 items-center justify-between">
          {/* Logo (lg+) */}
          <div className="hidden space-x-2 lg:flex lg:items-center">
            <Link href="/" className="mr-12">
              <span className="sr-only">Gizmo tech dz</span>
              <Logo />
            </Link>
            {categories.slice(0, 5).map((category) => {
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  type="button"
                  id={category.id}
                >
                  <Button variant="plain" className="text-base">
                    {category.name}
                  </Button>
                </Link>
              )
            })}
            <Dropdown>
              <DropdownButton variant="plain" className="text-base">
                Autres
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu anchor="bottom start">
                {categories.slice(5).map((category) => (
                  <DropdownItem
                    key={category.id}
                    href={`/category/${category.id}`}
                  >
                    {category.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Mobile menu and search (lg-) */}
          <Suspense fallback={<span className="flex-1" />}>
            <MobileMenu categories={categories} />
          </Suspense>
          {/* Logo (lg-) */}
          <Link href="/" className="lg:hidden">
            <span className="sr-only">Your Company</span>
            <Logo />
          </Link>

          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center space-x-4">
              <Suspense>
                <Search />
                <Cart />
              </Suspense>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
function TopBanner() {
  return (
    <div className="relative z-20 bg-gray-900">
      <div className="px-4 py-3.5 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-white sm:text-base lg:flex-none">
          Appelez-nous au téléphone{' '}
          <span className="inline-block">0559 21 74 83</span>
        </p>
      </div>
    </div>
  )
}
export { Header, TopBanner }
