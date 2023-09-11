import Image from 'next/image'
import Link from 'next/link'

const Activity = ({ activity }: any) => {
  return (
    <Link href={`/thread/${activity.parentId}`}>
      <article className='activity-card'>
        <Image
          src={activity.author.image}
          alt='user'
          width={20}
          height={20}
          className='rounded-full object-cover'
        />
        <p className='!text-small-regular text-light-1'>
          <span className='mr-1 text-primary-500'>{activity.author.name}</span>
          replied to your thread
        </p>
      </article>
    </Link>
  )
}

export default Activity
