import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import AppSidebar from '@/components/Sidebar';
import NextAuthSessionProvider from '@/providers/SessionProvider';
import { Toaster } from 'sonner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Trainify',
  description: 'Trainify - Desenvolvimento de Software CIn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <NextAuthSessionProvider>
          <SidebarProvider className='bg-[#303030] pl-2' defaultOpen={false}>
            <AppSidebar />
            <main className='w-full h-full pt-2 flex flex-col'>
              <SidebarTrigger className='bg-[#303030] hover:bg-[#404040] text-white hover:text-white' />
              {children}
              <Toaster richColors />
            </main>
          </SidebarProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
