'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
//
import { sidebarLinks } from '@/constants'

const LeftSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link, id) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route
          return (
            <Link
              href={link.route}
              key={id}
              className={
                isActive
                  ? 'bg-primary-500 leftsidebar_link'
                  : 'leftsidebar_link'
              }
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>
      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton
            signOutCallback={() => {
              router.push('/')
            }}
          >
            <div className='flex gap-4 p-4 curson-pointer'>
              <Image
                src='/icons/logout.svg'
                alt='Sign Out'
                width={24}
                height={24}
              />
              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar
