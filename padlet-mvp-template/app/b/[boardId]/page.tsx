import { prisma } from '@/lib/db';
import BoardGrid from '@/components/BoardGrid';
import NewCard from '@/components/NewCard';
import ImageUploader from '@/components/ImageUploader';
import ModeratorPanel from '@/components/ModeratorPanel';

export default async function BoardPage({ params, searchParams }: { params: { boardId: string }, searchParams: { [k: string]: string|undefined } }) {
  const board = await prisma.board.findUnique({ where: { id: params.boardId } });
  if (!board) return <div>존재하지 않는 보드</div> as any;
  const cards = await prisma.card.findMany({ where: { boardId: board.id }, orderBy: { createdAt: 'desc' } });
  const isAdmin = searchParams?.admin === board.adminKey;
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{board.title}</h1>
        {isAdmin && <span className="text-xs p-2 border rounded">관리자 모드</span>}
      </div>
      {board.allowUploads && (
        <div className="space-y-3">
          <NewCard boardId={board.id} onCreated={()=>{}} />
          <ImageUploader boardId={board.id} onUploaded={()=>{}} />
        </div>
      )}
      <BoardGrid initial={cards} boardId={board.id} />
      {isAdmin && <ModeratorPanel boardId={board.id} adminKey={board.adminKey} />}
    </main>
  );
}
