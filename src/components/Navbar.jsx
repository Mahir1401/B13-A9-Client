'use client';

import { signOut, useSession } from '@/lib/auth-client';
import { Button, Dropdown, Header, Label, Separator, useTheme } from '@heroui/react';
import {
  Home,
  Moon,
  PawPrint,
  Search,
  Sun,
  ChevronDown,
  LayoutGrid,
  LogOut,
  LogIn,
  Rocket,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme('light');
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDarkMode = mounted && resolvedTheme === 'dark';

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out');
    }
  };

  const handleMenuAction = (key) => {
    if (key === 'dashboard') {
      router.push('/requests');
    } else if (key === 'logout') {
      handleLogout();
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home, private: false },
    { href: '/pets', label: 'All Pets', icon: Search, private: false }
  ];


  return (
    <header className="sticky top-0 z-40 w-full border-b border-cream/15 bg-brown transition-colors">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <PawPrint className="size-8 rounded-full border-2 border-baby-blue p-1 text-baby-blue transition-transform group-hover:scale-105" />
          <span className="font-serif text-[1.35rem] font-bold tracking-[-0.02em] text-cream">
            PetNest
          </span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 transition-colors ${
                  isActive
                    ? 'bg-baby-blue font-semibold text-brown'
                    : 'text-cream/85 hover:bg-white/10 hover:text-cream'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
            className="cursor-pointer rounded-full p-2 text-cream transition-colors hover:bg-white/10"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="text-baby-blue" size={20} /> : <Moon size={20} />}
          </button>

          {isPending ? (
            <div className="h-8 w-24 animate-pulse rounded-full bg-white/10" />
          ) : user ? (
            <Dropdown>
              <Button
                aria-label="User Menu"
                variant="ghost"
                className="group flex cursor-pointer items-center gap-2 bg-transparent p-0 focus:outline-none"
              >
                <Image
                  src={user.image || '/image_pgdFnZ.png'}
                  alt={user.name || 'User Profile'}
                  referrerPolicy="no-referrer"
                  className="size-8 rounded-full border-2 border-baby-blue object-cover"
                  height={32}
                  width={32}
                  unoptimized={user.image?.startsWith('http')}
                />
                <span className="hidden max-w-[120px] truncate text-sm font-medium text-cream transition-colors sm:inline">
                  {user.name}
                </span>
                <ChevronDown
                  className="text-cream/75 transition-transform duration-200 group-aria-expanded:rotate-180 group-data-[open=true]:rotate-180"
                  size={16}
                />
              </Button>

              <Dropdown.Popover
                placement="bottom end"
                className="min-w-[220px] rounded-xl border border-border bg-overlay p-1.5 shadow-lg"
              >
                <Dropdown.Menu onAction={handleMenuAction} aria-label="User menu">
                  <Dropdown.Section>
                    <Header className="flex flex-col gap-0.5 px-2.5 py-2">
                      <span className="text-sm font-semibold leading-tight text-overlay-foreground">
                        {user.name}
                      </span>
                      <span className="truncate text-xs font-normal text-muted">
                        {user.email}
                      </span>
                    </Header>
                  </Dropdown.Section>

                  <Separator className="my-1 bg-separator" />

                  <Dropdown.Item
                    id="dashboard"
                    textValue="Dashboard"
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-overlay-foreground transition-colors hover:bg-default"
                  >
                    <LayoutGrid size={16} className="text-muted" />
                    <Label>Dashboard</Label>
                  </Dropdown.Item>

                  <Separator className="my-1 bg-separator" />

                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    variant="danger"
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-danger hover:bg-danger/10"
                  >
                    <LogOut size={16} />
                    <Label>Logout</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/login"
                className="flex items-center gap-2 whitespace-nowrap px-3 py-1.5 text-sm font-medium text-cream transition-opacity hover:opacity-80"
              >
                <LogIn className="size-4 text-baby-blue" />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-baby-blue px-5 py-2 text-sm font-semibold text-brown shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
              >
                <Rocket className="size-4" />
                Get Started
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="cursor-pointer rounded-lg p-2 text-cream hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="flex flex-col gap-2 border-t border-cream/15 bg-brown px-[5%] py-4 md:hidden">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-baby-blue font-semibold text-brown'
                    : 'text-cream hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}