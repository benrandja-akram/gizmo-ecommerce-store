'use client'

import { CopyCheckIcon, CopyIcon } from 'lucide-react'
import { useRef, useState } from 'react'

function Copy({ text, children }: React.PropsWithChildren<{ text: string }>) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const onCopy = async () => {
    clearTimeout(timeoutRef.current)
    setCopied(true)
    await navigator.clipboard.writeText(text)

    timeoutRef.current = setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <>
      {children}

      <button onClick={onCopy} className="group">
        {copied ? (
          <CopyCheckIcon className="animate-in fade-in-0 zoom-in-50 w-5 text-teal-600" />
        ) : (
          <CopyIcon className="w-5 text-gray-500 transition-all group-hover:text-gray-900" />
        )}
      </button>
    </>
  )
}

export { Copy }
