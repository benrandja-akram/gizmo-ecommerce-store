'use client'

import type { CMSCategory } from '@gizmo/cms'
import { Label, Radio, RadioField, RadioGroup, clsx } from '@gizmo/ui'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

function Filters({
  categories,
  selectedCategory = 'all',
}: {
  categories: CMSCategory[]
  selectedCategory?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()

  return (
    <div className={clsx(pending && 'opacity-50', 'transition-all')}>
      <h3 className="sr-only">Catégories</h3>

      <RadioGroup
        name="category"
        defaultValue={selectedCategory}
        className="xs:grid-cols-2 mx-auto grid max-w-xl md:grid-cols-3 lg:grid-cols-1"
        onChange={(category) => {
          let search = ''
          if (category !== 'all') search = `?category=${category}`

          startTransition(() => void router.push(`${pathname}${search}`))
        }}
      >
        <RadioField>
          <Radio value={'all'} />
          <Label className={'font-medium'}>Toutes catégories</Label>
        </RadioField>

        {categories.map((category) => (
          <RadioField key={category.id}>
            <Radio value={category.id} />
            <Label>{category.name}</Label>
          </RadioField>
        ))}
      </RadioGroup>
    </div>
  )
}

export { Filters }
