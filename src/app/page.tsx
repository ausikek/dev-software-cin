'use client';

import MainChat from '@/components/MainChat';
import PromptInput from '@/components/PromptInput';
import { ParsedChatHistory } from '@/types';
import { useState } from 'react';

export default function Home() {
  const [parsedChatHistory, setParsedChatHistory] = useState<
    ParsedChatHistory[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSentinel] = useState<boolean>(false);

  return (
    <div className='bg-[#303030] w-full h-screen flex flex-col items-center gap-8'>
      <MainChat chatHistory={parsedChatHistory} />
      <PromptInput
        setSentinel={setSentinel}
        parsedChatHistory={parsedChatHistory}
        setParsedChatHistory={setParsedChatHistory}
      />
    </div>
  );
}
