export type SSEMessage = { boardId: string; type: string; payload: any };
const channels = new Map<string, Set<ReadableStreamDefaultController>>();

export function publish(msg: SSEMessage) {
  const set = channels.get(msg.boardId);
  if (!set) return;
  const data = `data: ${JSON.stringify(msg)}\n\n`;
  for (const ctrl of set) ctrl.enqueue(new TextEncoder().encode(data));
}

export function subscribe(boardId: string) {
  return new ReadableStream({
    start(controller) {
      const set = channels.get(boardId) || new Set();
      set.add(controller);
      channels.set(boardId, set);
      controller.enqueue(new TextEncoder().encode(': connected\n\n'));
    },
    cancel() {
      const set = channels.get(boardId);
      if (!set) return;
      for (const c of set) set.delete(c);
    },
  });
}
