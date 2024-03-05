'use client'

import { Drawer } from '@/components/drawer'
import { useDialog } from '@/hooks/use-dialog'
import { Cart } from '@/ui/cart'
import { Logo } from '@/ui/logo'
import { Bars3Icon } from '@heroicons/react/24/outline'
import type { Category } from '@prisma/client'
import { MoveRightIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { TopBanner } from './header'
import messageUs from './messenger.webp'

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
        <TopBanner />
        <div className=" flex items-center justify-between space-x-2 px-4 pt-4">
          <Logo />
          <div className="flex flex-1 items-center justify-center space-x-2">
            <a target="_blank" href="//m.me/226796627192300">
              <Image
                src={messageUs}
                width={24}
                height={24}
                alt=""
                unoptimized
              />
            </a>
            <Cart />
          </div>
          <button className="outline-none" onClick={onClose}>
            <XIcon />
          </button>
        </div>
        <ul className="divide-y overflow-y-auto p-4">
          <Link href="/" className="flex justify-between py-2.5 font-medium">
            Home
            <MoveRightIcon className="w-5 text-gray-800" />
          </Link>
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex justify-between py-2.5 font-medium"
              >
                {category.name}

                <MoveRightIcon className="w-5 text-gray-800" />
              </Link>
            )
          })}
        </ul>
      </Drawer>
    </>
  )
}

export { MobileMenu }
