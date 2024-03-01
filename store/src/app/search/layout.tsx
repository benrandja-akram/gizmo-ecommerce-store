import { Search } from './search'

async function SearchLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Search />

        {children}
      </main>
    </div>
  )
}

export default SearchLayout
