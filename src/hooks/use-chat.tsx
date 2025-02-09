'use client';

import { useState } from 'react';
import type { Content } from '@google/generative-ai';
import type { ParsedChatHistory } from '@/types';
import { config } from '@/lib/utils';

export function useChat() {
  const [parsedChatHistory, setParsedChatHistory] = useState<
    ParsedChatHistory[]
  >([]);
  const [chatHistory, setChatHistory] = useState<Content[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitPrompt = async (prompt: string) => {
    // Immediately add user message to chat history
    const userMessage: ParsedChatHistory = {
      id: Date.now().toString(),
      role: 'user',
      text: prompt,
    };
    setParsedChatHistory((prev) => [...prev, userMessage]);

    setIsSubmitting(true);
    try {
      const res = await fetch(`${config.apiURL}/api`, {
        method: 'POST',
        body: JSON.stringify({
          message: prompt,
          chatHistory: chatHistory,
          parsedChatHistory: [...parsedChatHistory, userMessage],
        }),
      });

      const payload = await res.json();

      const newChatHistory: Content[] = [...payload.chatHistory];
      const newParsedChatHistory: ParsedChatHistory[] = [
        ...payload.parsedChatHistory,
      ];

      setChatHistory(newChatHistory);
      setParsedChatHistory(newParsedChatHistory);
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
