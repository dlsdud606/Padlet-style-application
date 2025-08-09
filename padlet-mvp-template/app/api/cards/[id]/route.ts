import { prisma } from '@/lib/db';
import { publish } from '@/lib/sse';
import { NextResponse } from 'next/server';

type Body = { action: 'like'|'hide'|'delete'; adminKey?: string };

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const { action, adminKey } = (await req.json()) as Body;
  const card = await prisma.card.findUnique({ where: { id: params.id }, include: { board: true } });
  if (!card) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (action === 'like') {
    const updated = await prisma.card.update({ where: { id: card.id }, data: { likes: { increment: 1 } } });
    publish({ boardId: card.boardId, type: 'card_updated', payload: updated });
    return NextResponse.json(updated);
  }

  if (adminKey !== card.board.adminKey) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (action === 'hide') {
    const updated = await prisma.card.update({ where: { id: card.id }, data: { isHidden: true } });
    publish({ boardId: card.boardId, type: 'card_updated', payload: updated });
    return NextResponse.json(updated);
  }
  if (action === 'delete') {
    await prisma.card.delete({ where: { id: card.id } });
    publish({ boardId: card.boardId, type: 'card_deleted', payload: { id: card.id } });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
