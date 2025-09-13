import { WhatsAppButton } from '@/components/index'
import { ThemeToggle } from '@/providers/colors-theme-provider'
import React from 'react'

function page() {
  return (
    <div className='relative min-h-screen'>
     <h1>Public</h1>
     <WhatsAppButton />
    </div>
  )
}

export default page
