import React from 'react'

export default function loading() {
  return (
    <div className="min-h-screen bg-background w-[95%] max-w-7xl mx-auto text-foreground">
 animate-pulse      {/* Hero Section */}
      <section className="relative h-[50vh] w-full rounded-md">
       
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 px-4">
        {/* Left Side - Contact Info & Map */}
        <div
          className="space-y-6"
        >
          <div className='rounded-md p-6 border bg-secondary-foreground/20 animate-pulse space-y-4'>
           <p className='bg-secondary-foreground/30 animate-pulse h-4 w-25'></p>
           <p className='bg-secondary-foreground/30 animate-pulse h-4 w-25'></p>
           <p className='bg-secondary-foreground/30 animate-pulse h-4 w-30'></p>
           <p className='bg-secondary-foreground/30 animate-pulse h-4 w-14'></p>
           <p className='bg-secondary-foreground/30 animate-pulse h-4 w-28'></p>
           <p className='bg-secondary-foreground/30 animate-pulse h-4 w-14'></p>
          </div>
          <div className='space-y-4 h-70 rounded-md p-6 border bg-secondary-foreground/20 animate-pulse '></div>
        </div>

        <div className='space-y-4 rounded-md p-6 border bg-secondary-foreground/20 animate-pulse '>
            <p className='bg-secondary-foreground/30 animate-pulse h-6 w-24'></p>
            <p className='bg-secondary-foreground/30 animate-pulse h-6 w-full'></p>
            <p className='bg-secondary-foreground/30 animate-pulse h-6 w-full'></p>
            <p className='bg-secondary-foreground/30 animate-pulse h-6 w-full'></p>
            <p className='bg-secondary-foreground/30 animate-pulse h-18 w-full'></p>
            <p className='bg-secondary-foreground/30 animate-pulse h-10 w-full'></p>
          </div>
      </section>
    </div>
  )
}
