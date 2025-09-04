import {  ArrowLeftCircle, MoveLeftIcon, } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Back({link}: {link: string}) {
  return (
    <Link
    title='Go Back'
     href={link} className='flex items-center gap-2 bg-slate-100 hover:shadow hover:bg-slate-200 trans p-2 rounded cursor-pointer'>
      <ArrowLeftCircle className='text-neutral-600'/>
      <span className='hidden lg:block text-sm text-neutral-600'>Back</span>
    </Link>
  )
}

export default Back
