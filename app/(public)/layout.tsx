import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="grow pt-[72px]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
