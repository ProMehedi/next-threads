import { UserButton } from '@clerk/nextjs'

const Home = () => {
  return (
    <>
      <h1 className='head-text text-left'>Welcome to Threads!</h1>
      <UserButton afterSignOutUrl='/' />
    </>
  )
}

export default Home
