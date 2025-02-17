import { config } from '@/lib/utils';
import {
  GoogleGenerativeAI,
  type GenerateContentResult,
  type Content,
} from '@google/generative-ai';
import { type NextRequest, NextResponse } from 'next/server';
import type { ParsedChatHistory } from '@/types';
import { randomUUID } from 'crypto';

const genAI = new GoogleGenerativeAI(config.geminiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    'Você é um personal trainer, formado em educação física e com vastos conhecimentos sobre todo tipo de exercício físico que o usuário deseja praticar ou deve praticar, de acordo com sua inferência. Com base nos dados fornecidos pelo usuário, você pode sugerir exercícios, corrigir posturas e dar dicas de alimentação saudável. Responda somente em português.',
});

export async function POST(req: NextRequest) {
  try {
    const { message, chatHistory, parsedChatHistory } = await req.json();

    const newChatHistory: Content[] = [...chatHistory];

    const chat = model.startChat({ history: newChatHistory });
    const chatResponse = await chat.sendMessage(message);

    const newParsedChatHistory: ParsedChatHistory[] = handleChatHistory(
      chatResponse,
      parsedChatHistory
    );

    return NextResponse.json({
      chatHistory: newChatHistory,
      parsedChatHistory: newParsedChatHistory,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'Error Occurred',
    });
  }
}

export async function GET() {
  return NextResponse.json({ smileyFace: 'Hey :)' });
}

function handleChatHistory(
  modelResponse: GenerateContentResult,
  array: ParsedChatHistory[]
) {
  const temp_array = [...array];

  temp_array.push({
    id: randomUUID().toString(),
    role: 'model',
    text: modelResponse.response.text(),
  });

  return temp_array;
}
