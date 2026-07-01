'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Mail,
  QrCode,
  Monitor,
  MessageSquare,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils/helpers';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Invites', href: '/invites', icon: Mail },
  { name: 'Pair Device', href: '/pair', icon: QrCode },
  { name: 'Live Screen', href: '/live-screen', icon: Monitor },
  { name: 'WhatsApp', href: '/whatsapp', icon: MessageSquare },
  { name: 'Location', href: '/location', icon: MapPin },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h1 className="text-xl font-bold">Remote Monitor</h1>
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || ''} />
                <AvatarFallback>
                  {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.displayName || 'User'}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-b">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <NotificationBell />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoURL || ''} />
                      <AvatarFallback>
                        {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
