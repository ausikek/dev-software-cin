'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Dumbbell } from 'lucide-react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { ChatHistory, User } from '@prisma/client';
import ChatButton from '../ChatButton';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SelectScrollable() {
  const { status, data } = useSession();
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const { data: user, isLoading } = useSWR<
    User & { chatHistory: ChatHistory[] }
  >(status === 'authenticated' ? `/api/user/${data.user.id}` : null, fetcher, {
    refreshInterval: 5000,
  });

  const handleValueChange = (chatId: string) => {
    setSelectedValue(chatId);
    router.push(`/chats/${chatId}`);
    // Reset the selection after navigation
    setTimeout(() => setSelectedValue(''), 100);
  };

  if (status === 'authenticated') {
    return (
      <Select value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger className='w-[13rem] h-[2.5rem] rounded-3xl bg-[#464646] hover:bg-[#464646]/90 text-white border-0'>
          <div className='flex flex-row items-center gap-2 pl-10'>
            <Dumbbell width={20} height={20} />
            Meus treinos
          </div>
        </SelectTrigger>
        <SelectContent>
          {user?.chatHistory.length && !isLoading
            ? user.chatHistory.map((chat) => (
                <SelectItem value={chat.id} key={chat.id}>
                  {chat.title}
                </SelectItem>
              ))
            : 'Você não possui treinos cadastrados. Interaja com o Trainify!'}
        </SelectContent>
      </Select>
    );
  }

  return (
    <ChatButton
      variant='button'
      onClick={() =>
        toast.error('Para acessar seus treinos, você precisa estar logado.')
      }
    >
      {<Dumbbell width={20} height={20} />}Meus Treinos
    </ChatButton>
  );
}
