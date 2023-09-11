import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
// Components
import { Activity as ActivityCard } from '@components/cards'
// Utils
import { fetchUser, getActivity } from '@utils/actions/userActions'

const Activity = async () => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const activity = await getActivity(userInfo._id)

  return (
    <section>
      <h1 className='head-text mb-10'>Activity</h1>

      <div className='mt-10 flex flex-col gap-5'>
        {activity.length == 0 && (
          <p className='no-result'>No Activity found!</p>
        )}

        {activity.length > 0 &&
          activity.map((act) => (
            <ActivityCard key={act.parentId} activity={act} />
          ))}
      </div>
    </section>
  )
}

export default Activity
