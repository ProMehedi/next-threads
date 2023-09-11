import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
// Components
import { Thread } from '@components/cards'
// Utils
import { fetchThreadById } from '@utils/actions/threadActions'
import { fetchUser } from '@utils/actions/userActions'

const SingleThread = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const thread = await fetchThreadById(params.id)

  return (
    <section className='relative'>
      <div>
        <Thread
          id={thread._id}
          currentUserId={user?.id || ''}
          parentid={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
    </section>
  )
}

export default SingleThread
