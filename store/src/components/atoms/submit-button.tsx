'use client'

import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from './button'

function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus()

  return <Button type="submit" {...props} disabled={pending} />
}

export { SubmitButton }
