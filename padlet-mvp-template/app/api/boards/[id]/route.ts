import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const board = await prisma.board.findUnique({ where: { id: params.id }, include: { cards: { orderBy: { createdAt: 'desc' } } } });
  if (!board) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(board);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { allowUploads, adminKey } = await req.json();
  const board = await prisma.board.findUnique({ where: { id: params.id } });
  if (!board) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (adminKey !== board.adminKey) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const updated = await prisma.board.update({ where: { id: params.id }, data: { allowUploads } });
  return NextResponse.json(updated);
}
