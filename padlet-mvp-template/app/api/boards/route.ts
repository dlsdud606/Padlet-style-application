import { prisma } from '@/lib/db';
import { shortId, uuid } from '@/lib/id';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title } = await req.json();
  const board = await prisma.board.create({
    data: { title, publicKey: shortId(), adminKey: uuid() }
  });
  return NextResponse.json({
    boardId: board.id,
    url: `/b/${board.id}?k=${board.publicKey}`,
    adminUrl: `/b/${board.id}?admin=${board.adminKey}`,
  });
}

export async function GET() {
  const boards = await prisma.board.findMany({ take: 10, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(boards.map(b => ({ id: b.id, title: b.title })));
}
