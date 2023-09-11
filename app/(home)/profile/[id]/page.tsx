import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
// Components
import { ProfileHeader } from '@components/shared'
// Utils
import { fetchUser } from '@utils/actions/userActions'

const Profile = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(params.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <section>
      <ProfileHeader
        accountId={userInfo._id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <h1>This is Profile</h1>
    </section>
  )
}

export default Profile
