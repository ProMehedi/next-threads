import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: string
  currentUserId: string
  parentid: string | null
  content: string
  author: {
    id: string
    name: string
    image: string
  }
  community?: {
    id: string
    name: string
    image: string
  }
  createdAt: string
  comments: {
    author: {
      image: string
    }
  }[]
  isComment?: boolean
}

const Thread: React.FC<Props> = ({
  id,
  currentUserId,
  parentid,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? 'px-0 xs:px-7 mb-6' : 'bg-dark-2 p-7'
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='Profile Photo'
                fill
                className='rounded-full object-contain'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`}>
              <h4 className='text-base-semibold text-light-1'>{author.name}</h4>
            </Link>
            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
              {/* Social Icons */}
              <div className='flex gap-3 5'>
                <Image
                  className='cursor-pointer object-contain'
                  src='/icons/heart-gray.svg'
                  alt='Heart'
                  width={16}
                  height={16}
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    className='object-contain'
                    src='/icons/Reply.svg'
                    alt='Reply'
                    width={16}
                    height={16}
                  />
                </Link>
                <Image
                  className='cursor-pointer object-contain'
                  src='/icons/repost.svg'
                  alt='Repost'
                  width={16}
                  height={16}
                />
                <Image
                  className='cursor-pointer object-contain'
                  src='/icons/share.svg'
                  alt='Share'
                  width={16}
                  height={16}
                />
              </div>
              {/* End of Social Icons */}

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Thread
