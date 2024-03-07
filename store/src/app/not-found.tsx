import { Button } from '@/components/button'
import { HomeIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-[600px] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/">
              <Button color="indigo">
                <HomeIcon width={24} stroke="white" />
                Go back home
              </Button>
            </Link>
            <a href="#">
              <Button plain>
                Contact support <ArrowRightIcon className="inline w-5" />
              </Button>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
