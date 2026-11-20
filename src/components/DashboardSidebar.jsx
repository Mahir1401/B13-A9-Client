'use client';

import { FileText, Heart, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <aside
      style={{ padding: '1.5rem 1rem' }}
      className="w-64 shrink-0 min-h-[calc(100vh-4.5rem)] bg-[#F9F4ED] dark:bg-[#2B1A11] border-r border-[#3B2418]/15 dark:border-[#F2E8DA]/15 transition-colors"
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
  );
}
