import { Footer } from '@/components/footer';
import { MainNav } from '@/components/main-nav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
