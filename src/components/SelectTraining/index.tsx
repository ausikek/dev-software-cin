'use client';
import { ChevronDown, Dumbbell } from 'lucide-react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { ChatHistory, User } from '@prisma/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useRouter } from 'next/navigation';

export function WorkoutCollapsible() {
  const { status, data } = useSession();
  const { data: user, isLoading } = useSWR<
    User & { chatHistory: ChatHistory[] }
  >(status === 'authenticated' ? `/api/user/${data.user.id}` : null, fetcher, {
    refreshInterval: 5000,
  });
  const router = useRouter();

  const navigateToWorkout = (chatId: string) => {
    // Use direct navigation
    router.push(`/chats/${chatId}`);
  };

  if (status === 'authenticated') {
    return (
      <Collapsible className='w-full'>
        <CollapsibleTrigger className='flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-sidebar-accent/50 transition-colors text-white'>
          <div className='flex items-center gap-2'>
            <Dumbbell className='h-4 w-4' />
            <span>Meus treinos</span>
          </div>
          <ChevronDown className='h-4 w-4 transition-transform ui-open:rotate-180' />
        </CollapsibleTrigger>
        <CollapsibleContent className='pl-6 pr-2 py-1'>
          {!isLoading && user?.chatHistory && user.chatHistory.length > 0 ? (
            <div className='max-h-48 overflow-y-auto'>
              {user.chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => navigateToWorkout(chat.id)}
                  className='px-2 py-1.5 text-xs cursor-pointer hover:bg-sidebar-accent/50 rounded-sm transition-colors text-white'
                >
                  {chat.title}
                </div>
              ))}
            </div>
          ) : (
            <div className='py-2 text-xs text-muted-foreground'>
              Você não possui treinos cadastrados. Interaja com o Trainify!
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      variant='ghost'
      className='w-full justify-start px-3 py-2 h-auto text-sm'
      onClick={() =>
        toast.error('Para acessar seus treinos, você precisa estar logado.')
      }
    >
      <Dumbbell className='h-4 w-4 mr-2' />
      <span>Meus Treinos</span>
    </Button>
  );
}
