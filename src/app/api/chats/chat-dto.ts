import { z } from 'zod';

export const ChatDTO = z.object({
  title: z.string(),
  history: z.array(z.any()),
  parsedHistory: z.array(z.any()),
  userId: z.string(),
});

export const UpdateChatDTO = ChatDTO.partial();

export type TChatDTO = z.infer<typeof ChatDTO>;
export type TUpdateChatDTO = z.infer<typeof UpdateChatDTO>;
