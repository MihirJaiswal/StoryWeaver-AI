'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { navigation } from '../../constant';

function HomeNav() {
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <nav
        className={`${
          openNavigation ? 'flex' : 'hidden'
        } fixed top-[5rem] left-0 right-0 bottom-0 bg-black lg:static lg:flex lg:mx-auto lg:bg-transparent`}
      >
        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.route}
              onClick={handleClick}
              className={`block relative font-code text-2xl uppercase text-n-1 transition-colors text-white hover:text-color-1 ${
                item.route === pathname ? 'lg:hidden' : ''
              } px-6 py-6 md:py-8 lg:py-4 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                item.route === pathname
                  ? 'z-2 lg:text-n-1'
                  : 'lg:text-n-1/50'
              } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
            >
              {item.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation Toggle (Hamburger Icon) */}
      <div className="lg:hidden flex items-center justify-between p-4">
        <button
          onClick={() => setOpenNavigation(!openNavigation)}
          className="text-white text-2xl"
        >
          {openNavigation ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Navigation (Dropdown) */}
      <div
        className={`${
          openNavigation ? 'block' : 'hidden'
        } fixed top-[5rem] left-0 right-0 bg-black text-white flex flex-col items-center py-8 space-y-6`}
      >
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.route}
            onClick={handleClick}
            className={`block font-code text-xl uppercase transition-colors text-white hover:text-color-1 ${
              item.route === pathname ? 'text-color-1' : ''
            }`}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}

export default HomeNav;
