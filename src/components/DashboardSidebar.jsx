'use client';

import { Dropdown, Label } from '@heroui/react';
import { ChevronDown, FileText, Heart, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  {
    label: 'My Requests',
    href: '/requests',
    icon: FileText,
  },
  {
    label: 'Add Pet',
    href: '/add-pet',
    icon: Plus,
  },
  {
    label: 'My Listings',
    href: '/listings',
    icon: Heart,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const activeItem =
    menuItems.find((item) => item.href === pathname) || menuItems[0];
  const ActiveIcon = activeItem.icon;

  return (
    <>
      <div
        style={{ padding: '0.85rem 1rem' }}
        className="md:hidden w-full bg-[#F9F4ED] dark:bg-[#2B1A11] border-b border-[#3B2418]/15 dark:border-[#F2E8DA]/15"
      >
        <Dropdown>
          <Dropdown.Trigger
            style={{
              backgroundColor: '#8EC5FF',
              color: '#3B2418',
              padding: '0.65rem 1rem',
            }}
            className="w-full flex items-center justify-between rounded-full text-sm font-semibold shadow-xs cursor-pointer outline-none"
          >
            <span className="flex items-center gap-2.5">
              <ActiveIcon size={18} />
              {activeItem.label}
            </span>
            <ChevronDown size={18} />
          </Dropdown.Trigger>

          <Dropdown.Popover className="w-[calc(100vw-2rem)]">
            <Dropdown.Menu
              aria-label="Dashboard Navigation"
              onAction={(key) => router.push(String(key))}
              style={{
                backgroundColor: '#F9F4ED',
                border: '1px solid rgba(59, 36, 24, 0.15)',
                padding: '0.5rem',
              }}
              className="rounded-2xl shadow-md flex flex-col gap-1"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Dropdown.Item
                    key={item.href}
                    id={item.href}
                    textValue={item.label}
                    style={{
                      backgroundColor: isActive ? '#8EC5FF' : 'transparent',
                      color: '#3B2418',
                      padding: '0.65rem 0.9rem',
                    }}
                    className="rounded-xl cursor-pointer flex items-center gap-3 text-sm font-medium hover:bg-[#F2E8DA] transition-colors"
                  >
                    <Icon size={17} />
                    <Label className="cursor-pointer font-semibold">
                      {item.label}
                    </Label>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      <aside
        style={{ padding: '1.5rem 1rem' }}
        className="hidden md:block w-64 shrink-0 min-h-[calc(100vh-4.5rem)] bg-[#F9F4ED] dark:bg-[#2B1A11] border-r border-[#3B2418]/15 dark:border-[#F2E8DA]/15 transition-colors"
      >
        <p
          style={{ padding: '0 0.85rem', marginBottom: '0.85rem' }}
          className="text-xs font-semibold uppercase tracking-wider text-[#3B2418]/65 dark:text-[#F2E8DA]/65"
        >
          Menu
        </p>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '0.65rem 1rem',
                  backgroundColor: isActive ? '#8EC5FF' : 'transparent',
                  color: isActive ? '#3B2418' : undefined,
                }}
                className={`flex items-center gap-3 rounded-full text-sm transition-colors ${
                  isActive
                    ? 'font-semibold shadow-xs'
                    : 'font-medium text-[#3B2418]/80 dark:text-[#F2E8DA]/80 hover:bg-[#F2E8DA] dark:hover:bg-[#3B2418] hover:text-[#3B2418] dark:hover:text-[#F2E8DA]'
                }`}
              >
                <Icon size={18} />
                <p className="m-0">{item.label}</p>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
