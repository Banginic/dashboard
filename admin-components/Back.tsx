import {  ArrowLeftCircle, MoveLeftIcon, } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Back({link}: {link: string}) {
  return (
    <Link
    title='Go Back'
     href={link} className='flex items-center gap-2 bg-chart-2 text-background hover:shadow hover:scale-x-105 trans trans p-2 rounded cursor-pointer'>
      <ArrowLeftCircle className=''/>
      <span className='hidden lg:block text-sm '>Back</span>
    </Link>
  )
}

export default Back
