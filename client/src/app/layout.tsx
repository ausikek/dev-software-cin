import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import AppSidebar from '@/components/Sidebar';

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
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider className='bg-[#303030] pt-2 pl-2'>
          <AppSidebar />
          <main className='w-screen h-[100vh-100rem]'>
            <SidebarTrigger className='bg-[#303030] hover:bg-[#404040] text-white hover:text-white' />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
