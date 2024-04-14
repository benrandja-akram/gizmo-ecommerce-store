'use client'

import { Drawer } from '@/components/atoms/drawer'
import { Logo } from '@/components/ui/logo'
import { useDialog } from '@/hooks/use-dialog'
import { Bars3Icon } from '@heroicons/react/24/outline'
import type { Category } from '@prisma/client'
import { ChevronRightIcon, XIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'

type Props = {
  categories: Category[]
}

function MobileMenu({ categories }: Props) {
  const { isOpen, onClose, onOpen } = useDialog('menu')
  return (
    <>
      <div className="flex flex-1 items-center lg:hidden">
        <button
          type="button"
          className="-ml-2 rounded-md bg-white p-2 text-gray-400"
          onClick={onOpen}
          disabled={isOpen}
        >
          <span className="sr-only">Open menu</span>

          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <Drawer isOpen={isOpen} onClose={onClose} side="left">
        <div className=" flex items-center justify-between space-x-2 px-4 pt-4">
          <Logo />

          <button className="group outline-none" onClick={onClose}>
            <XIcon className="text-gray-500 transition-all group-hover:text-gray-900" />
          </button>
        </div>
        <ul className="divide-y overflow-y-auto p-4">
          <Link href="/" className="flex justify-between py-2.5 font-medium">
            Accueil
            <ChevronRightIcon className="w-5 text-gray-600" />
          </Link>
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex justify-between py-2.5 font-medium"
              >
                {category.name}

                <ChevronRightIcon className="w-5 text-gray-600" />
              </Link>
            )
          })}
        </ul>
      </Drawer>
    </>
  )
}

export { MobileMenu }
