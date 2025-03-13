'use client';

import MainChat from '@/components/MainChat';
import PromptInput from '@/components/PromptInput';
import { useChat } from '@/hooks/use-chat';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const params = useParams();

  const chatId = params?.id as string;

  const { parsedChatHistory, isSubmitting, submitPrompt } = useChat(chatId);
  // eslint-disable-next-line
  const [firstMessage, setFirstMessage] = useState(false);

  return (
    <div className='bg-[#303030] w-full h-full flex flex-col justify-around gap-8'>
      <div className='flex-1'>
        <MainChat chatHistory={parsedChatHistory} />
      </div>
      <div className='mt-auto'>
        <PromptInput
          isSubmitting={isSubmitting}
          onSubmit={submitPrompt}
          setFirstMessage={setFirstMessage}
        />
      </div>
    </div>
  );
}
