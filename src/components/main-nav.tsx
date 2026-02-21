'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
} from 'lucide-react';

import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/placeholder-data';

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
  ...categories.map((c) => ({ href: `/products?category=${c.id}`, label: c.name })),
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              StyleSphere
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNavLinks.slice(0, 2).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === href ? 'text-primary' : 'text-foreground/60'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">StyleSphere</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {mainNavLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                        pathname === href ? 'text-primary font-semibold' : 'text-foreground/70'
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <Link href="/" className="flex items-center space-x-2 md:hidden mx-auto">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">StyleSphere</span>
        </Link>


        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Link href="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
