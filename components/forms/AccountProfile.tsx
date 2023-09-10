'use client'

import * as z from 'zod'
import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
//
import { userSchema } from '@utils/validations'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Textarea,
} from '@components/forms'
import Button from '@components/Button'
import { isBase64Image } from '@utils'
import { useUploadThing } from '@utils/uploadThing'
import { updateUser } from '@utils/actions/userActions'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  user: {
    id: string
    objectId?: string
    username?: string
    name?: string
    bio?: string
    image?: string
  }
  btnTitle: string
}

const AccountProfile: React.FC<Props> = ({ user, btnTitle }) => {
  const [file, setFile] = React.useState<File[]>([])

  const { startUpload } = useUploadThing('media')

  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      profile_photo: user?.image || '',
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || '',
    },
  })

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()
  }

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const blob = values.profile_photo
    const hasImgChanged = isBase64Image(blob)

    if (hasImgChanged) {
      const imgRes = await startUpload(file)

      if (imgRes && imgRes.length > 0) {
        values.profile_photo = imgRes[0].url
      }
    }

    await updateUser({
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      userId: user.id,
      path: pathname,
    })

    if (pathname === '/profile/edit') {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-start gap-8'
      >
        <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='Profile Photo'
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain border-4 border-primary-500'
                  />
                ) : (
                  <Image
                    src='/icons/profile.svg'
                    alt='Profile Photo'
                    width={24}
                    height={24}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input type='text' className='account-form_input' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Username
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input type='text' className='account-form_input' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Textarea rows={6} className='account-form_input' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default AccountProfile
