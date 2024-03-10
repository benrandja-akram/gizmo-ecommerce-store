import { Button } from '@/components/atoms/button'
import { HomeIcon } from '@heroicons/react/24/outline'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-[600px] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page non trouvée
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Désolé, nous n’avons pas trouvé la page que vous recherchez.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/">
              <Button color="indigo">
                <HomeIcon width={24} stroke="white" />
                Aller à l'accueil
              </Button>
            </Link>
            <a target="_blank" href="//m.me/226796627192300">
              <Button variant="plain">
                <ChatBubbleLeftIcon className="inline w-5" />
                Contacter le support
              </Button>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
