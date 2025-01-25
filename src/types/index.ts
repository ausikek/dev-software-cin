export interface ParsedChatHistory {
  id: string;
  role: 'user' | 'model';
  text: string;
}
