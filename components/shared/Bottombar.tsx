'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
//
import { sidebarLinks } from '@/constants'

const Bottombar = () => {
  const pathname = usePathname()

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLinks.map((link, id) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route
          return (
            <Link
              href={link.route}
              key={id}
              className={
                isActive ? 'bg-primary-500 bottombar_link' : 'bottombar_link'
              }
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                {link.label.split(/\s/)[0]}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Bottombar
