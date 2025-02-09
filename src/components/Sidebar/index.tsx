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
import ChatButton from '@/components/ChatButton';
import { SelectScrollable } from '../SelectTraining';
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
            <SidebarMenu>
              <SidebarMenuItem>
                <Link className='flex flex-col gap-2 pt-5' href={'/'}>
                  <ChatButton variant='button'>
                    <MessageSquare />
                    Novo Chat
                  </ChatButton>
                  <SelectScrollable />
                </Link>
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
