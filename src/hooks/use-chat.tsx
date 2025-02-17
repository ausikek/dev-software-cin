'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import type { Content } from '@google/generative-ai';
import type { ParsedChatHistory } from '@/types';
import { config } from '@/lib/utils';
import { fetcher } from '@/lib/fetcher';

export function useChat(chatId?: string) {
  const { data: session } = useSession();
  const router = useRouter();
  const [parsedChatHistory, setParsedChatHistory] = useState<
    ParsedChatHistory[]
  >([]);
  const [chatHistory, setChatHistory] = useState<Content[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = useSWR(
    chatId ? `${config.apiURL}/api/chats/${chatId}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setChatHistory([...data.history]);
      setParsedChatHistory([...data.parsedHistory]);
    }
  }, [data]);

  const submitPrompt = async (prompt: string) => {
    const userMessage: ParsedChatHistory = {
      id: Date.now().toString(),
      role: 'user',
      text: prompt,
    };
    setParsedChatHistory((prev) => [...prev, userMessage]);

    setIsSubmitting(true);
    try {
      // First, send the prompt to /api to get the model response
      const modelRes = await fetch(`${config.apiURL}/api`, {
        method: 'POST',
        body: JSON.stringify({
          message: prompt,
          chatHistory: chatHistory,
          parsedChatHistory: [...parsedChatHistory, userMessage],
        }),
      });
      const modelData = await modelRes.json();
      setChatHistory([...modelData.chatHistory]);
      setParsedChatHistory([...modelData.parsedChatHistory]);

      if (session) {
        if (chatId) {
          await fetch(`${config.apiURL}/api/chats/${chatId}`, {
            method: 'PATCH',
            body: JSON.stringify({
              history: modelData.chatHistory,
              parsedHistory: modelData.parsedChatHistory,
            }),
          });
        } else {
          const res = await fetch(`${config.apiURL}/api/chats`, {
            method: 'POST',
            body: JSON.stringify({
              title: `Treino de ${new Date().toLocaleDateString('pt-BR')}`,
              history: modelData.chatHistory,
              parsedHistory: modelData.parsedChatHistory,
              userId: session.user.id,
            }),
          });
          const newChatData = await res.json();
          setTimeout(() => {
            router.push(`/chats/${newChatData.id}`);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error submitting prompt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    parsedChatHistory,
    isSubmitting,
    submitPrompt,
  };
}
