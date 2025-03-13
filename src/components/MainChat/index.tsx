'use client';

import ChatButton from '@/components/ChatButton';
import type { ParsedChatHistory } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    <div className='h-[42rem]'>
      <ScrollArea className='h-full w-full'>
        <div
          className='flex flex-col gap-6 md:gap-10 py-4 md:py-10 px-4 md:px-16 lg:px-44 pb-4'
          ref={scrollRef}
        >
          <AnimatePresence>
            {chatHistory.map((content) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {content.role === 'user' ? (
                  <div className='flex justify-end'>
                    <ChatButton variant='bubble'>{content.text}</ChatButton>
                  </div>
                ) : (
                  <div className='flex justify-start w-auto min-w-[13rem] max-w-full text-white'>
                    <ReactMarkdown
                      className='prose prose-invert prose-sm md:prose break-words max-w-full'
                      remarkPlugins={[remarkGfm]}
                    >
                      {content.text}
                    </ReactMarkdown>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
}
