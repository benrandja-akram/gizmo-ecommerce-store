import messenger from '@/app/messenger.webp'
import { Button } from '@/components/button'
import {
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/solid'
import { ArrowUpRightIcon, CopyIcon } from 'lucide-react'
import Image from 'next/image'

function OrderConfirmed({ name }: { name: string }) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-8 min-h-[600px] bg-white py-10">
      <div className="mx-auto max-w-xl rounded-md bg-green-50 p-4">
        <div className="flex">
          <div>
            <CheckCircleIcon
              className="h-8 w-8 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-bold text-green-800">
              Thank You {name}
            </h2>
            <div className="font-medium">
              Your order has been received successfully, we will contact you
              soon to confirm your order.
            </div>
            <div className="my-3">In the mean time you can contact us on:</div>
            <div className="flex flex-wrap gap-4">
              <a target="_blank" href="tel://0789784578">
                <Button color="white">
                  <PhoneIcon />
                  0789784578
                  <ArrowUpRightIcon className="w-5 text-gray-500" />
                </Button>
              </a>
              <a target="_blank" href="//m.me/226796627192300">
                <Button color="white">
                  <Image
                    src={messenger}
                    unoptimized
                    width={20}
                    height={20}
                    alt=""
                  />
                  Messenger
                  <ArrowUpRightIcon className="w-5 text-gray-500" />
                </Button>
              </a>
              <Button color="white">
                <EnvelopeIcon />
                Email: contact@gizmotechdz.com
                <CopyIcon className="w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { OrderConfirmed }
