import { UserButton } from '@clerk/nextjs'

function Home() {
  return (
    <main>
      <h1 className='text-heading1-bold'>Welcome to Threads!</h1>
      <UserButton afterSignOutUrl='/' />
    </main>
  )
}

export default Home
