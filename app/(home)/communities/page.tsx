import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
// Components
import { Activity as ActivityCard } from '@components/cards'
// Utils
import { fetchUser, getActivity } from '@utils/actions/userActions'

const Communities = async () => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  return (
    <section>
      <h1 className='head-text mb-10'>Communities</h1>
    </section>
  )
}

export default Communities
