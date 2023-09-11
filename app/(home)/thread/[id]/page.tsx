import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
// Components
import { Thread } from '@components/cards'
import { Comment } from '@components/forms'
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

      <div className='mt-7'>
        <Comment
          threadId={thread._id}
          currentUserId={JSON.stringify(userInfo._id)}
          currentUserImg={userInfo.image}
        />
      </div>

      <div className='mt-10'>
        {thread.children.map((comment: any) => (
          <Thread
            id={comment._id}
            currentUserId={user?.id || ''}
            parentid={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment
          />
        ))}
      </div>
    </section>
  )
}

export default SingleThread
