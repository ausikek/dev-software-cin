import { config } from '@/lib/utils';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const chatHistory: Content[] = [];

const genAI = new GoogleGenerativeAI(config.geminiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    'Você é um personal trainer, formado em educação física e com vastos conhecimentos sobre todo tipo de exercício físico que o usuário deseja praticar ou deve praticar, de acordo com sua inferência. Com base nos dados fornecidos pelo usuário, você pode sugerir exercícios, corrigir posturas e dar dicas de alimentação saudável. Responda somente em português.',
});
const chat = model.startChat({ history: chatHistory });

// Interact with Gemini API
export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const chatResponse = await chat.sendMessage(message);

  return NextResponse.json({
    message: chatResponse.response.text(),
  });
}
