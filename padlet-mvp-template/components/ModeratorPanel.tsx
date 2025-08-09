'use client';
import { useEffect, useState } from 'react';

type Card = { id: string; text?: string|null; imageUrl?: string|null; isHidden: boolean; likes: number };

export default function ModeratorPanel({ boardId, adminKey }: { boardId: string; adminKey: string }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [allow, setAllow] = useState(true);

  useEffect(() => {
    fetch(`/api/boards/${boardId}`).then(r=>r.json()).then(b=>{ setCards(b.cards); setAllow(b.allowUploads); });
  }, [boardId]);

  async function setLock(next: boolean) {
    await fetch(`/api/boards/${boardId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ allowUploads: next, adminKey }) });
    setAllow(next);
  }

  async function hide(id: string) {
    await fetch(`/api/cards/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'hide', adminKey }) });
    setCards(prev => prev.map(c => c.id===id ? { ...c, isHidden: true } : c));
  }
  async function del(id: string) {
    await fetch(`/api/cards/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', adminKey }) });
    setCards(prev => prev.filter(c => c.id!==id));
  }

  return (
    <div className="border rounded-lg p-3 space-y-3">
      <div className="flex items-center justify-between">
        <strong>모더레이터 패널</strong>
        <button onClick={()=>setLock(!allow)} className="text-xs border rounded p-2">{allow?'업로드 잠그기':'업로드 열기'}</button>
      </div>
      <div style={{maxHeight:'300px', overflow:'auto'}} className="space-y-3">
        {cards.map(c=> (
          <div key={c.id} className="text-xs border rounded p-2 flex items-center gap-2">
            {c.imageUrl ? <img src={c.imageUrl} alt="" style={{width:40, height:40, objectFit:'cover', borderRadius:6}}/> : <span className="p-2 rounded border">T</span>}
            <div style={{flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.text || c.imageUrl}</div>
            {c.isHidden ? <span style={{opacity:.6}}>숨김</span> : (<>
              <button onClick={()=>hide(c.id)} className="border rounded p-2">숨김</button>
              <button onClick={()=>del(c.id)} className="border rounded p-2">삭제</button>
            </>)}
          </div>
        ))}
      </div>
    </div>
  );
}
