'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='fixed w-full top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm z-50'>
      <div className='container mx-auto px-4 flex justify-between items-center py-3'>
        {/* Logo */}
        <Link
          href='/'
          className='text-2xl font-bold text-blue-600 dark:text-blue-400'
        >
          X-Commex
        </Link>

        {/* Right Side */}
        <div className='flex items-center gap-5'>
          {/* Auth Condition */}
          {user ? (
            <div className='relative' ref={dropdownRef}>
              <Button
                variant='outline'
                onClick={() => setOpen(prev => !prev)}
                className='flex items-center gap-2 px-3 py-1 border rounded-md cursor-pointer 
                hover:bg-gray-100 dark:hover:bg-gray-800 transition'
              >
                {/* Profile Icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 text-gray-700 dark:text-gray-300'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z'
                  />
                </svg>

                {/* Down Arrow */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </Button>

              {/* Dropdown */}
              {open && (
                <div className='absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md overflow-hidden'>
                  <Link
                    href='/profile'
                    className='block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Button
                    variant='ghost'
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 cursor-pointer dark:hover:bg-red-900/20 justify-start'
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Link href='/auth/login'>
              <Button
                variant='outline'
                className='text-sm text-blue-600 dark:text-blue-400 border border-blue-400 px-6 py-3 rounded-md cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20'
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
