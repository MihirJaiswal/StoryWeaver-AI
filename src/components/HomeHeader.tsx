import Image from 'next/image'
import React from 'react'
import HomeNav from './HomeNav'
import HomeMobileNav from './HomeMobileNav'
import { ModeToggle } from './ModeToggle'

const HomeHeader = () => {
  return (
    <div className='fixed w-full top-0 z-50  backdrop-blur-sm border-b border-purple-300 lg:backdrop-blur-sm'>
        <div className='flex justify-between items-center px-5 lg:px-7.5 xl:px-10'>
        <a href="/" className='flex items-center w-[12rem] xl:mr-8'>
            {/* <Image
            alt='logo'
            src={logo}
            width={52}
            height={42}
            className='max-sm:size-10 m-2'
            /> */}
            <p className='text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700 font-bold text-2xl max-lg:hidden'>StoryWeaver <span className='text-pink-700'>AI</span></p>
        </a>
        <div>
        <HomeNav/>
        </div>
      <div className='flex-between gap-5'>
         <HomeMobileNav/>
      </div>
      <div>
        <ModeToggle/>
      </div>
    </div>  
    </div>
  )
}

export default HomeHeader