'use client';

import ChatButton from '../ChatButton';
import { ParsedChatHistory } from '@/types';

interface MainChatProps {
  chatHistory: ParsedChatHistory[];
}

export default function MainChat({ chatHistory }: MainChatProps) {
  return (
    <div className='flex flex-col gap-10 py-10 px-44'>
      {chatHistory.map((content) => {
        return content.role == 'user' ? (
          <div key={content.id} className='flex justify-end'>
            <ChatButton variant='bubble'>{content.text}</ChatButton>
          </div>
        ) : (
          <div
            key={content.id}
            className='flex justify-start w-auto min-w-[13rem] max-w-full h-auto min-h-[2.5rem] text-white'
          >
            {content.text}
          </div>
        );
      })}
    </div>
  );
}
