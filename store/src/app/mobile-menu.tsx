'use client'

import { Dialog, DialogBody, DialogClose } from '@/components/dialog'
import { useDialog } from '@/hooks/use-dialog'
import { Bars3Icon } from '@heroicons/react/24/outline'
import type { Category } from '@prisma/client'
import { MoveRightIcon, XIcon } from 'lucide-react'
import Link from 'next/link'

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
          {isOpen ? (
            <XIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <Dialog open={isOpen} onClose={onClose}>
        <DialogClose onClick={onClose} />
        <DialogBody className=" z-50">
          <ul className="divide-y">
            <Link href="/" className="flex justify-between py-2.5 font-medium">
              Home
              <MoveRightIcon className="w-5 text-gray-800" />
            </Link>
            {categories.map((category) => {
              return (
                <Link
                  key={category.id}
                  href={`/#category-${category.id}`}
                  className="flex justify-between py-2.5 font-medium"
                >
                  {category.name}

                  <MoveRightIcon className="w-5 text-gray-800" />
                </Link>
              )
            })}
          </ul>
        </DialogBody>
      </Dialog>
    </>
  )
}

export { MobileMenu }
