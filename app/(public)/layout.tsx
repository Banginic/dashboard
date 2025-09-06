'use client'
import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { publicProvider } from '@/providers/public-provider'
import { MainFooter, MainNavbar } from '@/components/index'

function MainLayout({ children}: { children: React.ReactNode}) {
  return (
    <QueryClientProvider client={publicProvider}>
      <MainNavbar />
      { children}
      <MainFooter />
    </QueryClientProvider>
  )
}

export default MainLayout
