'use client';

import { FileText, Heart, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    label: 'My Requests',
    href: '/dashboard/requests',
    icon: FileText,
  },
  {
    label: 'Add Pet',
    href: '/dashboard/add-pet',
    icon: Plus,
  },
  {
    label: 'My Listings',
    href: '/dashboard/listings',
    icon: Heart,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 min-h-[calc(100vh-4.5rem)] bg-[#F9F4ED] dark:bg-[#161D2F] border-r border-[#3B2418]/15 dark:border-white/10 p-4 transition-colors">
      <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-[#3B2418]/60 dark:text-slate-400">
        Menu
      </p>

      <nav className="flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#F47258] text-white shadow-sm'
                  : 'text-[#3B2418]/80 dark:text-slate-300 hover:bg-[#F47258]/15 dark:hover:bg-[#4A2535] hover:text-[#3B2418] dark:hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
