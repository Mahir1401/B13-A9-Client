'use client';

import { signOut, useSession } from '@/lib/auth-client';
import { Button, Dropdown, Header, Label, Separator } from '@heroui/react';
import {
  Home,
  Moon,
  PawPrint,
  Search,
  Sun,
  ChevronDown,
  LayoutGrid,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleMenuAction = (key) => {
    if (key === 'dashboard') {
      router.push('/dashboard');
    } else if (key === 'logout') {
      handleLogout();
    }
  };

  return (
    <header className="w-full bg-[#3B2418] dark:bg-[#23150E] border-b border-[#F2E8DA]/15 transition-colors">
      <div
        className="w-full flex justify-between items-center h-[4.5rem]"
        style={{ padding: '0 1.5rem' }}
      >
        <Link href="/" className="flex items-center group" style={{ gap: '0.65rem' }}>
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
            className={`flex items-center justify-center rounded-full whitespace-nowrap transition-colors ${
              pathname === '/'
                ? 'bg-[#8EC5FF] text-[#3B2418] font-semibold'
                : 'text-[#F2E8DA]/80 hover:text-[#F2E8DA] hover:bg-[#F2E8DA]/10'
            }`}
            style={{ gap: '0.45rem', padding: '0.45rem 1rem' }}
          >
            <Home size={16} />
            <span>Home</span>
          </Link>

          <Link
            href="/pets"
            className={`flex items-center justify-center rounded-full whitespace-nowrap transition-colors ${
              pathname === '/pets'
                ? 'bg-[#8EC5FF] text-[#3B2418] font-semibold'
                : 'text-[#F2E8DA]/80 hover:text-[#F2E8DA] hover:bg-[#F2E8DA]/10'
            }`}
            style={{ gap: '0.45rem', padding: '0.45rem 1rem' }}
          >
            <Search size={16} />
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
              <Sun className="text-[#8EC5FF]" size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {isPending ? (
            <div className="w-24 h-8 animate-pulse bg-[#F2E8DA]/10 rounded-full" />
          ) : user ? (
            <div className="relative">
              <Dropdown>
                <Button
                  aria-label="Menu"
                  variant="ghost"
                  className="flex items-center gap-2 bg-transparent p-0 focus:outline-none group cursor-pointer"
                >
                  <Image
                    src={user.image || '/image_pgdFnZ.png'}
                    alt="User Profile"
                    className="rounded-full border-2 border-[#8EC5FF] object-cover"
                    style={{ width: '2rem', height: '2rem' }}
                    height={32}
                    width={32}
                    unoptimized={user.image?.startsWith('http')}
                  />

                  <span className="text-sm font-medium text-[#F2E8DA] group-hover:text-[#8EC5FF] transition-colors">
                    {user.name}
                  </span>

                  <ChevronDown
                    className="text-[#F2E8DA]/70 transition-transform duration-200 group-aria-expanded:rotate-180 group-data-[open=true]:rotate-180"
                    size={16}
                  />
                </Button>

                <Dropdown.Popover
                  placement="bottom end"
                  className="min-w-[220px] rounded-xl bg-[#F9F4ED] dark:bg-[#2B1A11] border border-[#3B2418]/15 dark:border-[#F2E8DA]/15 shadow-lg p-1.5"
                >
                  <Dropdown.Menu onAction={handleMenuAction} aria-label="User menu">
                    <Dropdown.Section>
                      <Header className="px-2.5 py-2 flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-[#3B2418] dark:text-[#F2E8DA] leading-tight">
                          {user.name}
                        </span>
                        <span className="text-xs font-normal text-[#3B2418]/65 dark:text-[#F2E8DA]/65 truncate">
                          {user.email}
                        </span>
                      </Header>
                    </Dropdown.Section>

                    <Separator className="my-1 bg-[#3B2418]/10 dark:bg-[#F2E8DA]/10" />

                    <Dropdown.Item
                      id="dashboard"
                      textValue="Dashboard"
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-[#3B2418] dark:text-[#F2E8DA] hover:bg-[#F2E8DA] dark:hover:bg-[#3B2418] cursor-pointer"
                    >
                      <LayoutGrid size={16} className="text-[#3B2418]/75 dark:text-[#F2E8DA]/75" />
                      <Label>Dashboard</Label>
                    </Dropdown.Item>

                    <Separator className="my-1 bg-[#3B2418]/10 dark:bg-[#F2E8DA]/10" />

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut size={16} />
                      <Label>Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
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
