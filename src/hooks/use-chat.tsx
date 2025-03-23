'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { config } from '@/lib/utils';
import { fetcher } from '@/lib/fetcher';
import { toast } from 'sonner';
import { ChatHistory } from '@prisma/client';
import type { Content } from '@google/generative-ai';
import type { ParsedChatHistory } from '@/types';
import useSWR from 'swr';
import { JsonValue } from '@prisma/client/runtime/library';

export function useChat(chatId?: string) {
  const { data: session } = useSession();
  const router = useRouter();
  const [parsedChatHistory, setParsedChatHistory] = useState<
    ParsedChatHistory[]
  >([]);
  const [chatHistory, setChatHistory] = useState<Content[] | JsonValue[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = useSWR<ChatHistory>(
    chatId && session?.user.id ? `${config.apiURL}/api/chats/${chatId}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      if (!data.history) {
        router.replace('/');
        toast.error('Chat não encontrado');
        return;
      }

      if (data.userId !== session?.user.id) {
        router.replace('/');
        toast.error('Você não tem permissão para acessar este chat');
        return;
      }

      setChatHistory([...data.history]);
      // @ts-expect-error Let's ignore this error for now
      setParsedChatHistory([...data.parsedHistory]);
    }
  }, [data, router, session]);

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
