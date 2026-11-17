'use client';
import { Home, Moon, PawPrint, Search, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="w-full bg-[#3B2418] dark:bg-[#23150E] border-b border-[#F2E8DA]/15 transition-colors">
      <div
        className="w-full flex justify-between items-center h-[4.5rem]"
        style={{ padding: '0 1.5rem' }}
      >
        <Link
          href="/"
          className="flex items-center group"
          style={{ gap: '0.65rem' }}
        >
          <PawPrint
            className="text-[#8EC5FF] border-2 border-[#8EC5FF] rounded-full transition-transform group-hover:scale-105"
            style={{ width: '2rem', height: '2rem', padding: '0.25rem' }}
          />
          <span className="font-[Fraunces] text-[1.35rem] font-bold text-[#F2E8DA] tracking-[-0.02em]">
            PetNest
          </span>
        </Link>

        <nav className="flex items-center text-sm font-medium" style={{ gap: '0.75rem' }}>
          <Link
            href="/"
            className={`flex items-center justify-center rounded-full whitespace-nowrap transition-colors ${pathname === '/'
                ? 'bg-[#8EC5FF] text-[#3B2418] font-semibold'
                : 'text-[#F2E8DA]/80 hover:text-[#F2E8DA] hover:bg-[#F2E8DA]/10'
              }`}
            style={{ gap: '0.45rem', padding: '0.45rem 1rem' }}
          >
            <Home style={{ width: '1rem', height: '1rem' }} />
            <span>Home</span>
          </Link>

          <Link
            href="/pets"
            className={`flex items-center justify-center rounded-full whitespace-nowrap transition-colors ${pathname === '/pets'
                ? 'bg-[#8EC5FF] text-[#3B2418] font-semibold'
                : 'text-[#F2E8DA]/80 hover:text-[#F2E8DA] hover:bg-[#F2E8DA]/10'
              }`}
            style={{ gap: '0.45rem', padding: '0.45rem 1rem' }}
          >
            <Search style={{ width: '1rem', height: '1rem' }} />
            <span>All Pets</span>
          </Link>
        </nav>

        <div className="flex items-center" style={{ gap: '1rem' }}>
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-[#F2E8DA]/80 hover:text-[#F2E8DA] hover:bg-[#F2E8DA]/10 rounded-full transition-colors cursor-pointer"
            style={{ padding: '0.5rem' }}
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="text-[#8EC5FF]" style={{ width: '1.25rem', height: '1.25rem' }} />
            ) : (
              <Moon style={{ width: '1.25rem', height: '1.25rem' }} />
            )}
          </button>

          {/* {user ? ( */}
          {2 < 1 ? (
            // <div className="relative">
            //   <button
            //     type="button"
            //     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            //     className="flex items-center focus:outline-none group cursor-pointer"
            //     style={{ gap: '0.5rem' }}
            //   >
            //     <Image
            //       src={user.avatarUrl || '/image_pgdFnZ.png'}
            //       alt="User Profile"
            //       className="rounded-full border-2 border-[#8EC5FF] object-cover"
            //       style={{ width: '2rem', height: '2rem' }}
            //       height={32}
            //       width={32}
            //     />
            //     <span className="text-sm font-medium text-[#F2E8DA] group-hover:text-[#8EC5FF] transition-colors">
            //       {user.name}
            //     </span>
            //     <svg
            //       className={`text-[#F2E8DA]/70 transition-transform ${
            //         isDropdownOpen ? 'rotate-180' : ''
            //       }`}
            //       style={{ width: '1rem', height: '1rem' }}
            //       fill="none"
            //       stroke="currentColor"
            //       viewBox="0 0 24 24"
            //     >
            //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            //     </svg>
            //   </button>

            //   {/* {isDropdownOpen && (
            //     <div
            //       className="absolute right-0 mt-2 w-48 bg-[#F9F4ED] dark:bg-[#2B1A11] border border-[#3B2418]/20 dark:border-[#F2E8DA]/15 rounded-xl shadow-lg z-50"
            //       style={{ padding: '0.4rem 0' }}
            //     >
            //       <Link
            //         href="/profile"
            //         onClick={() => setIsDropdownOpen(false)}
            //         className="block text-sm text-[#3B2418] dark:text-[#F2E8DA] hover:bg-[#F2E8DA] dark:hover:bg-[#3B2418] transition-colors"
            //         style={{ padding: '0.5rem 1rem' }}
            //       >
            //         Your Profile
            //       </Link>
            //       <Link
            //         href="/settings"
            //         onClick={() => setIsDropdownOpen(false)}
            //         className="block text-sm text-[#3B2418] dark:text-[#F2E8DA] hover:bg-[#F2E8DA] dark:hover:bg-[#3B2418] transition-colors"
            //         style={{ padding: '0.5rem 1rem' }}
            //       >
            //         Settings
            //       </Link>
            //       <hr className="border-[#3B2418]/15 dark:border-[#F2E8DA]/15 my-1" />
            //       <button
            //         type="button"
            //         onClick={() => {
            //           setIsDropdownOpen(false);
            //           onLogout?.();
            //         }}
            //         className="block w-full text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-[#F2E8DA] dark:hover:bg-[#3B2418] transition-colors cursor-pointer"
            //         style={{ padding: '0.5rem 1rem' }}
            //       >
            //         Sign out
            //       </button>
            //     </div>
            //   )} */}
            // </div>
            <p>hello</p>
          ) : (
            <div className="flex items-center" style={{ gap: '1rem' }}>
              <Link
                href="/login"
                className="text-sm font-medium text-[#F2E8DA]/90 hover:text-[#8EC5FF] whitespace-nowrap transition-colors"
                style={{ padding: '0.4rem 0.5rem' }}
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="text-sm font-semibold bg-[#8EC5FF] hover:bg-[#73B6FF] text-[#3B2418] rounded-full whitespace-nowrap transition-colors"
                style={{ padding: '0.45rem 1.15rem' }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
