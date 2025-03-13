'use client';

import { Brain, LogIn, MessageSquare } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { WorkoutCollapsible } from '../SelectTraining';
import { useSession } from 'next-auth/react';
import { LoginModal } from '../LoginModal';
import LogoutButton from '../LogoutButton';
import Link from 'next/link';

export default function AppSidebar() {
  const { status } = useSession();

  return (
    <Sidebar className='border-[#161616]'>
      <SidebarContent className='bg-[#161616]'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-white flex flex-row gap-2'>
            <Brain />
            Trainify IA
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='flex flex-col gap-2 pt-4'>
              <SidebarMenuItem>
                <Link
                  className='flex flex-row gap-2 px-3 hover:bg-sidebar-accent/50 transition-colors text-white items-center py-2'
                  href={'/'}
                >
                  <MessageSquare className='h-4 w-4' />
                  Novo Chat
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <WorkoutCollapsible />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-[#161616]'>
        {status === 'authenticated' ? (
          <LogoutButton />
        ) : (
          <LoginModal triggerText='Entrar' icon={<LogIn />} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
