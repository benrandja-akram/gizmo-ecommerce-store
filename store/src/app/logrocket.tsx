'use client'

import { LOGROCKET_ID } from '@/utils/constants'
import Logrocket from 'logrocket'
import { useEffect } from 'react'

function Analytics() {
  useEffect(() => {
    Logrocket.init(LOGROCKET_ID)
  }, [])
  return null
}

export { Analytics as LogRocket }
