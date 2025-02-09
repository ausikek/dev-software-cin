'use client';

import { Brain, LogIn, LogOut, MessageSquare } from 'lucide-react';
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

export default function AppSidebar() {
  const session = useSession();

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
                <div className='flex flex-col gap-2 pt-5'>
                  <ChatButton variant='button'>
                    <MessageSquare />
                    Novo Chat
                  </ChatButton>
                  <SelectScrollable />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-[#161616]'>
        {session.data ? (
          <LogoutButton />
        ) : (
          <LoginModal triggerText='Entrar' icon={<LogIn />} />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
