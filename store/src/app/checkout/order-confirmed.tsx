import messenger from '@/app/messenger.webp'
import { Button, Copy } from '@gizmo/ui'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ArrowUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

function OrderConfirmed({ name }: { name: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-8 min-h-[600px] bg-white py-10">
      <div className="mx-auto max-w-xl rounded-md bg-green-50 p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div>
            <CheckCircleIcon
              className="h-8 w-8 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-800">Merci {name}</h2>
            <div className="font-medium">
              Nous avons bien reçu votre commande et nous prendrons contact avec
              vous bientôt pour la confirmer.
            </div>
            <div className="my-5">
              Si vous avez des questions, n'hésitez pas à nous contacter sur:
            </div>
            <div className="divide-y rounded-lg border bg-white text-sm">
              <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-gray-700">Téléphone</span>
                <span className="flex items-center space-x-2 font-bold text-gray-900">
                  <Copy text="0559217483">
                    <span>0559 21 74 83</span>
                  </Copy>
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-gray-700">Email</span>
                <span className="flex items-center space-x-2 font-bold text-gray-900">
                  <Copy text="contact@gizmotechdz.com">
                    <span>contact@gizmotechdz.com</span>
                  </Copy>
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-gray-700">Messenger</span>
                <a target="_blank" href="//m.me/226796627192300">
                  <Button color="white">
                    <Image
                      src={messenger}
                      unoptimized
                      width={20}
                      height={20}
                      alt=""
                    />
                    Gizmo Tech DZ
                    <ArrowUpRightIcon className="w-5 text-gray-500" />
                  </Button>
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { OrderConfirmed }
