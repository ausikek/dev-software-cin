import { config } from '@/lib/utils';
import {
  GoogleGenerativeAI,
  GenerateContentResult,
  Content,
} from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { ParsedChatHistory } from '@/types';
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

    console.log('Response Text: ', chatResponse.response.text());

    const newParsedChatHistory: ParsedChatHistory[] = handleChatHistory(
      message,
      chatResponse,
      parsedChatHistory
    );
    console.log(newParsedChatHistory);

    return NextResponse.json({
      chatHistory: newChatHistory,
      parsedChatHistory: newParsedChatHistory,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'Error Ocurred',
    });
  }
}

export async function GET() {
  return NextResponse.json({ smileyFace: 'Hey :)' });
}

function handleChatHistory(
  userPrompt: string,
  modelResponse: GenerateContentResult,
  array: ParsedChatHistory[]
) {
  const temp_array = [...array];

  temp_array.push({
    id: randomUUID().toString(),
    role: 'user',
    text: userPrompt,
  });
  temp_array.push({
    id: randomUUID().toString(),
    role: 'model',
    text: modelResponse.response.text(),
  });

  return temp_array;
}
