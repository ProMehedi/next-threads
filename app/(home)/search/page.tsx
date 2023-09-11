import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'
// Components
import { User } from '@components/cards'
// Utils
import { fetchUser, fetchUsers } from '@utils/actions/userActions'

const Search = async () => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  // Fetch User Data
  const result = await fetchUsers({
    userId: user.id,
    searchString: 'mehedi',
    pageNumber: 1,
    pageSize: 25,
  })

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length == 0 && (
          <p className='no-result'>No users found!</p>
        )}
        {result.users.length > 0 &&
          result.users.map((person) => (
            <User key={person.id} user={person} type='User' />
          ))}
      </div>
    </section>
  )
}

export default Search
