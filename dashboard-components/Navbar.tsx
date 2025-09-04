import React from 'react'
import { Button } from '../ui/button'
import { AlignLeft, ArrowLeft, Bell, MoveLeftIcon } from 'lucide-react'

function Navbar({ setSidebar, showSidebar}: {showSidebar: boolean, setSidebar: React.Dispatch<React.SetStateAction<boolean>>}) {
    function toggleSidebar(){
        setSidebar(!showSidebar)
    }
  return (
    <header>
      <nav className='h-[10dvh] lg:h-[12dvh] flex border- border-gray-30 justify-between bg-white from-pink-50 overflow-hidden to-blue-50  items-center px-4 lg:px-12 fixed top-0 right-0 left-0'>
         <Button onClick={toggleSidebar} variant={'ghost'}>
            {
                showSidebar ? <ArrowLeft size={45} /> : <AlignLeft size={45} />
            }
         </Button>
         <div className='flex items-center gap-4'>
            <Button variant={'ghost'} className='relative'>
                <Bell />
                <p className='size-2 rounded-full absolute -top-1 -right-0.5 bg-red-400'></p>
            </Button>
            <p>AD</p>
         </div>
      </nav>
    </header>
  )
}

export default Navbar
