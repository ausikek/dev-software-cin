'use client';

import ChatButton from '@/components/ChatButton';
import { ParsedChatHistory } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';

interface MainChatProps {
  chatHistory: ParsedChatHistory[];
}

export default function MainChat({ chatHistory }: MainChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <ScrollArea>
      <div
        className='flex flex-col gap-10 py-10 px-44 h-[42rem]'
        ref={scrollRef}
      >
        {chatHistory.map((content) => {
          return content.role == 'user' ? (
            <div key={content.id} className='flex justify-end'>
              <ChatButton variant='bubble'>{content.text}</ChatButton>
            </div>
          ) : (
            <p
              key={content.id}
              className='flex justify-start w-auto min-w-[13rem] max-w-full text-white'
            >
              {content.text}
            </p>
          );
        })}
      </div>
    </ScrollArea>
  );
}
