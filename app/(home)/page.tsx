import { currentUser } from '@clerk/nextjs'
// Components
import { Thread } from '@components/cards'
// Utils
import { fetchPosts } from '@utils/actions/threadActions'

const Home = async () => {
  const result = await fetchPosts(1, 30)

  const user = await currentUser()
  return (
    <>
      <h1 className='head-text text-left'>Welcome to Threads!</h1>

      <div className='mt-9 flex flex-col gap-10'>
        {result.posts.length == 0 && (
          <p className='no-result'>No threads found!</p>
        )}

        {result.posts.length > 0 &&
          result.posts.map((post) => (
            <Thread
              key={post._id}
              id={post._id}
              currentUserId={user?.id || ''}
              parentid={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))}
      </div>
    </>
  )
}

export default Home
