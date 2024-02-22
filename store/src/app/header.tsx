'use client'

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className=" px-4 py-2.5 sm:px-6 lg:px-8">
              <p className=" text-center text-sm font-medium text-white lg:flex-none">
                Call us on phone 0777558899
              </p>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="border-b border-gray-200 px-4 sm:px-6 lg:px-8">
            <div className="max-w-8xl mx-auto flex h-16 items-center justify-between">
              {/* Logo (lg+) */}
              <div className="hidden lg:flex lg:items-center">
                <Link href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
              </div>

              {/* Mobile menu and search (lg-) */}
              <div className="flex flex-1 items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Logo (lg-) */}
              <Link href="/" className="lg:hidden">
                <span className="sr-only">Your Company</span>
                <img
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                  className="h-8 w-auto"
                />
              </Link>

              <div className="flex flex-1 items-center justify-end">
                <div className="flex items-center space-x-4 lg:ml-8 lg:space-x-8">
                  <a
                    href="#"
                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
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
          </div>
        </nav>
      </header>
    </div>
  )
}
