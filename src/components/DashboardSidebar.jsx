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
      <div className="w-full border-b border-border bg-surface px-4 py-3.5 md:hidden">
        <Dropdown>
          <Dropdown.Trigger className="flex w-full cursor-pointer items-center justify-between rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-xs outline-none">
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
              className="flex flex-col gap-1 rounded-2xl border border-border bg-overlay p-2 shadow-md"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Dropdown.Item
                    key={item.href}
                    id={item.href}
                    textValue={item.label}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-overlay-foreground hover:bg-default'
                    }`}
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

      <aside className="hidden min-h-[calc(100vh-4.5rem)] w-64 shrink-0 border-r border-border bg-surface px-4 py-6 transition-colors md:block">
        <p className="mb-3.5 px-3.5 text-xs font-semibold uppercase tracking-wider text-muted">
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
                className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-accent font-semibold text-accent-foreground shadow-xs'
                    : 'font-medium text-surface-foreground/80 hover:bg-default hover:text-default-foreground'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}