'use client'

import Button from '@components/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  user: {
    id: string
    name: string
    username: string
    image: string
  }
  type: 'User' | 'Community'
}

const User: React.FC<Props> = ({ user, type }) => {
  const router = useRouter()

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <Image
          src={user.image}
          alt={user.name}
          width={48}
          height={48}
          className='rounded-full'
        />

        <div className='flex-1 text-ellipsis'>
          <h4 className='tet-base-semibold text-light-1'>{user.name}</h4>
          <p className='text-small-medium text-gray-1'>@{user.username}</p>
        </div>

        <Button
          className='user-card_btn'
          onClick={() => router.push(`/profile/${user.id}`)}
        >
          View
        </Button>
      </div>
    </article>
  )
}

export default User
