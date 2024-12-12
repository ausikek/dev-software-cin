import { config } from '@/lib/utils';
import {
  GoogleGenerativeAI,
  Content,
  GenerateContentResult,
} from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { ParsedChatHistory } from '@/types';
import { randomUUID } from 'crypto';

const chatHistory: Content[] = [];
const parsedChatHistory: ParsedChatHistory[] = [];

const genAI = new GoogleGenerativeAI(config.geminiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    'Você é um personal trainer, formado em educação física e com vastos conhecimentos sobre todo tipo de exercício físico que o usuário deseja praticar ou deve praticar, de acordo com sua inferência. Com base nos dados fornecidos pelo usuário, você pode sugerir exercícios, corrigir posturas e dar dicas de alimentação saudável. Responda somente em português.',
});
const chat = model.startChat({ history: chatHistory });

// Interact with Gemini API
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const chatResponse = await chat.sendMessage(message);
    console.log('Response Text: ', chatResponse.response.text());
    handleChatHistory(message, chatResponse);
    return NextResponse.json({
      chatHistory: parsedChatHistory,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'Error Ocurred',
    });
  }
}

export async function GET() {
  return NextResponse.json({ chatHistory: parsedChatHistory });
}

function handleChatHistory(
  userPrompt: string,
  modelResponse: GenerateContentResult
) {
  parsedChatHistory.push({
    id: randomUUID().toString(),
    role: 'user',
    text: userPrompt,
  });
  parsedChatHistory.push({
    id: randomUUID().toString(),
    role: 'model',
    text: modelResponse.response.text(),
  });
}
