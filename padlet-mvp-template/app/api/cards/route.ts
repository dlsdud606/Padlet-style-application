import { prisma } from '@/lib/db';
import { publish } from '@/lib/sse';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { boardId, authorId, kind, text, imageUrl } = await req.json();
  const card = await prisma.card.create({ data: { boardId, authorId, kind, text, imageUrl } });
  publish({ boardId, type: 'card_created', payload: card });
  return NextResponse.json(card);
}
