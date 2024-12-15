import { Brain, Dumbbell, LogOut, MessageSquare } from 'lucide-react';

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
import ChatButton from '../ChatButton';

export default function AppSidebar() {
  return (
    <Sidebar>
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
                  <ChatButton variant='button'>
                    <Dumbbell />
                    Meus Treinos
                  </ChatButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-[#161616]'>
        <ChatButton variant='button'>
          <LogOut />
          Sair
        </ChatButton>
      </SidebarFooter>
    </Sidebar>
  );
}
