import { useSearchParams } from 'next/navigation'

function useDialog(key: string) {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get(key) === 'true'
  const onOpen = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, 'true')
    window.history.pushState(null, '', `?${params.toString()}`)
  }
  const onClose = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return { isOpen, onClose, onOpen }
}

export { useDialog }
