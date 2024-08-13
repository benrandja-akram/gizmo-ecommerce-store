import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react'
import { clsx } from './clsx'

function Drawer({
  children,
  isOpen: show,
  onClose,
  side = 'right',
}: React.PropsWithChildren<{
  isOpen: boolean
  onClose(open: boolean): void
  side?: 'right' | 'left'
}>) {
  return (
    <Transition show={show} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={clsx(
                'pointer-events-none fixed inset-y-0 flex max-w-full ',
                side === 'right' ? ' right-0' : 'left-0',
              )}
            >
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom={clsx(
                  side === 'right' ? 'translate-x-full' : '-translate-x-full',
                )}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700 "
                leaveFrom="translate-x-0"
                leaveTo={clsx(
                  side === 'right' ? 'translate-x-full' : '-translate-x-full',
                )}
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-[min(85vw,448px)] overflow-y-auto bg-white">
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export { Drawer }
