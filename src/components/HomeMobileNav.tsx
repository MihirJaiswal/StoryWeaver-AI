'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navigation } from '../../constant/index'
import { DialogTitle } from '@radix-ui/react-dialog'
import { MenuIcon } from 'lucide-react'
import logo from '../../public/logo.png'

function HomeMobileNav() {
    const pathname = usePathname();

  return (
    <section className='w-full max-w-[264px] z-50'>
      <div className='flex flex-col md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <MenuIcon className='w-8 h-8 text-pink-700 dark:text-white' />
          </SheetTrigger>
          <SheetContent side='right' className='bg-white dark:bg-black bg-clip-padding backdrop-filter backdrop-blur-sm border-gray-700'>
            <DialogTitle className="sr-only">Menu</DialogTitle> 
            <Link href='/' className='flex items-center gap-1'>
               <Image
                  src={logo}
                  alt='logo'
                  className='w-12'
                  quality={100}
                  loading='lazy'
                  placeholder='blur'
              />
              <p className='text-[21px] font-bold  text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700 px-2 mt-1'>StoryWeaver AI</p>
            </Link>
            <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
              <SheetClose asChild>
                <section className='flex h-full flex-col gap-6 pt-16 text-black dark:text-white'>
                  <div className='flex flex-1 flex-col gap-6'>
                    {navigation.map((link) => {
                      const isActive = pathname === link.route;
                      return (
                        <SheetClose asChild key={link.route}>
                          <Link href={link.route} key={link.label} className={cn("flex gap-4 items-center p-4 rounded-md w-full max-w-60", { 'bg-pink-600 dark:bg-purple-600 text-white dark:text-black ': isActive, })}>
                            <p className='font-semibold text-[18px] '>{link.title}</p>
                          </Link>
                        </SheetClose>
                      )
                    })}
                  </div>
                </section>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  )
}

export default HomeMobileNav;
