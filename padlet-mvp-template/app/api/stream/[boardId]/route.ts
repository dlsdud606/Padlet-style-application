import { subscribe } from '@/lib/sse';

export const runtime = 'edge';
export async function GET(_: Request, { params }: { params: { boardId: string }}) {
  const stream = subscribe(params.boardId);
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
