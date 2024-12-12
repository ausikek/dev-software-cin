'use client';

import MainChat from '@/components/MainChat';
import { ParsedChatHistory } from '@/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [chatHistory, setChatHistory] = useState<ParsedChatHistory[]>([]);

  useEffect(() => {
    const getChatHistory = async () => {
      const response = await fetch('http://localhost:3000/api');
      const chatHistory = await response.json();
      setChatHistory(chatHistory.chatHistory);
    };

    getChatHistory();
  }, []);

  return (
    <div className='bg-[#303030] w-full h-screen'>
      <MainChat chatHistory={chatHistory} />
    </div>
  );
}
