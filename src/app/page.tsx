'use client';

import MainChat from '@/components/MainChat';
import PromptInput from '@/components/PromptInput';
import { useChat } from '@/hooks/use-chat';

export default function Home() {
  const { parsedChatHistory, isSubmitting, submitPrompt } = useChat();

  return (
    <div className='bg-[#303030] w-full h-screen flex flex-col items-center gap-8'>
      <MainChat chatHistory={parsedChatHistory} />
      <PromptInput isSubmitting={isSubmitting} onSubmit={submitPrompt} />
    </div>
  );
}
