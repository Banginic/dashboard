import React from 'react'

function Loading() {
  return (
    <div className='bg-background text-foreground grid min-h-[100dvh] place-items-center'>
      <h1 className='text-lg lg:text-2xl animate-pulse'>Loading....</h1>
    </div>
  )
}

export default Loading
