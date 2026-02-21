import { Github, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/icons';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} StyleSphere. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" target="_blank" rel="noreferrer">
            <div className="rounded-lg p-2 transition-colors hover:bg-muted">
              <Twitter className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <Link href="#" target="_blank" rel="noreferrer">
            <div className="rounded-lg p-2 transition-colors hover:bg-muted">
              <Instagram className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Instagram</span>
            </div>
          </Link>
          <Link href="#" target="_blank" rel="noreferrer">
            <div className="rounded-lg p-2 transition-colors hover:bg-muted">
              <Github className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
