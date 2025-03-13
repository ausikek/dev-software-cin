'use client';

import MainChat from '@/components/MainChat';
import PromptInput from '@/components/PromptInput';
import Typewriter from '@/components/Typewriter';
import { useChat } from '@/hooks/use-chat';
import { useState } from 'react';

export default function Home() {
  const { parsedChatHistory, isSubmitting, submitPrompt } = useChat();
  const [firstMessage, setFirstMessage] = useState(true);

  if (firstMessage) {
    return (
      <div className='bg-[#303030] w-full h-full flex flex-col items-center justify-center gap-4 px-4 mt-80 md:mt-96'>
        <h1 className='text-2xl md:text-4xl text-white text-center'>
          <Typewriter
            texts={[
              'Seja bem-vindo ao Trainify!',
              'O Agente de IA que te ajuda a ficar monstro! ',
              'Feito no Centro de Informática da UFPE',
            ]}
            speed={100}
            pauseTime={1500}
          />
        </h1>
        <PromptInput
          isSubmitting={isSubmitting}
          onSubmit={submitPrompt}
          setFirstMessage={setFirstMessage}
        />
      </div>
    );
  }

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
