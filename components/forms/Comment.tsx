'use client'

import * as z from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '@components/forms'
import Button from '@components/Button'
// Utils
import { commentSchema } from '@utils/validations'
import Image from 'next/image'
import { addCommentToThread } from '@utils/actions/threadActions'
import { usePathname } from 'next/navigation'

interface Props {
  threadId: string
  currentUserId: string
  currentUserImg: string
}

const Comment: React.FC<Props> = ({
  threadId,
  currentUserId,
  currentUserImg,
}) => {
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      thread: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    )

    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex items-center gap-3 w-full'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='User'
                  width={48}
                  height={48}
                  className='rounded-full object-covers'
                />
              </FormLabel>
              <FormControl className='border-nonoe bg-transparent'>
                <Input
                  type='text'
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none border-none'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  )
}

export default Comment
