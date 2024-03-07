'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { ArrowRightIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useTransition } from 'react'

function Search() {
  const router = useRouter()
  const params = useParams()
  const [pending, startTransition] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const query = new FormData(e.currentTarget).get('query')
        startTransition(() => {
          router.push(`/search/${query}`)
        })
      }}
      className=" flex flex-col items-baseline justify-between gap-4 border-b border-gray-200 pb-6 pt-6 lg:flex-row lg:pt-12"
    >
      <fieldset
        disabled={pending}
        className="mx-auto flex w-full max-w-xl flex-col gap-4  lg:flex-row"
      >
        <Input
          name="query"
          className={'h-11 w-full'}
          defaultValue={params.query}
          required
          type="text"
          autoFocus
          placeholder="Ryzen 5800X"
        />
        <Button type="submit" disabled={pending}>
          Rechercher
          <ArrowRightIcon className="w-5" />
        </Button>
      </fieldset>
    </form>
  )
}

export { Search }
