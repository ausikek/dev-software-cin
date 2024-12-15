'use client';

import MainChat from '@/components/MainChat';
import PromptInput from '@/components/PromptInput';
import { ParsedChatHistory } from '@/types';
import { useEffect, useState } from 'react';
import { config } from '@/lib/utils';

export default function Home() {
  const [chatHistory, setChatHistory] = useState<ParsedChatHistory[]>([]);
  const [sentinel, setSentinel] = useState<boolean>(false);

  useEffect(() => {
    const getChatHistory = async () => {
      const response = await fetch(`${config.apiURL}/api`);
      const chatHistory = await response.json();
      setChatHistory(chatHistory.chatHistory);
    };

    getChatHistory();
  }, [sentinel]);

  return (
    <div className='bg-[#303030] w-full h-screen flex flex-col items-center gap-8'>
      <MainChat chatHistory={chatHistory} />
      <PromptInput setSentinel={setSentinel} />
    </div>
  );
}
