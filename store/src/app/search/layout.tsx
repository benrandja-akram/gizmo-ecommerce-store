import { Metadata } from 'next'
import { Search } from './search'

export const metadata: Metadata = {
  title: 'Rechercher',
}

async function SearchLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-7xl ">
        <Search />

        {children}
      </main>
    </div>
  )
}

export default SearchLayout
