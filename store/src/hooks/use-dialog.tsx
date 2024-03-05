import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'

/**
 * custom hook to make sure back button closes the menu without getting back to previous url.
 */
function useDialog(key: string) {
  const searchParams = useSearchParams()
  const isOpen = searchParams.get(key) === 'true'
  const canPushToHistoryRef = useRef(isOpen)

  const onOpen = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, 'true')
    window.history.pushState(null, '', `?${params.toString()}`)
    canPushToHistoryRef.current = false
  }
  const onClose = () => {
    if (canPushToHistoryRef.current) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(key)
      window.history.pushState(null, '', `?${params.toString()}`)
    } else {
      window.history.back()
    }
  }
  const setOpen = (open: boolean) => (open ? onOpen() : onClose())

  return { isOpen, onClose, onOpen, setOpen }
}

export { useDialog }
