import Image from 'next/image';
import React from 'react';
import HomeNav from './HomeNav';
import HomeMobileNav from './HomeMobileNav';
import { ModeToggle } from './ModeToggle';

const HomeHeader = () => {
  return (
    <div className='fixed w-full top-0 z-50 bg-mainb backdrop-blur-sm border-b border-purple-500 dark:border-purple-900 lg:backdrop-blur-sm bg-white dark:bg-gray-900'>
      <div className='flex justify-between items-center px-5 lg:px-7.5 xl:px-10 py-3'>
        {/* Logo & Title */}
        <a href="/" className='flex items-center w-[12rem] xl:mr-8'>
          {/* Uncomment the below Image element if you have a logo */}
          {/* <Image 
            alt='logo'
            src={logo}
            width={52}
            height={42}
            className='max-sm:size-10 m-2'
          /> */}
           {/* Dark Mode Toggle */}
        <div className='flex items-center md:hidden'>
          <ModeToggle />
        </div>
          <p className='text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700 font-bold text-2xl transition-all duration-300 hover:text-pink-700 max-lg:hidden'>
            StoryWeaver <span className='text-pink-700'>AI</span>
          </p>
        </a>
        

        {/* Navigation - Desktop */}
        <div className="hidden lg:flex space-x-8 items-center">
          <HomeNav />
        </div>
 
        {/* Mobile Navigation */}
        <div className='flex lg:hidden gap-5 items-center'>
          <HomeMobileNav />
        </div>

       {/* Dark Mode Toggle */}
       <div className='md:flex items-center hidden'>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
