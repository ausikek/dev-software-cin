'use client';

import MainChat from '@/components/MainChat';
import PromptInput from '@/components/PromptInput';
import { useChat } from '@/hooks/use-chat';
import { useParams } from 'next/navigation';

export default function Home() {
  const params = useParams();

  const chatId = params?.id as string;

  const { parsedChatHistory, isSubmitting, submitPrompt } = useChat(chatId);

  return (
    <div className='bg-[#303030] w-full h-screen flex flex-col items-center gap-8'>
      <MainChat chatHistory={parsedChatHistory} />
      <PromptInput isSubmitting={isSubmitting} onSubmit={submitPrompt} />
    </div>
  );
}
