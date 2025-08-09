'use client';
import { useState } from 'react';

export default function NewCard({ boardId, onCreated }: { boardId: string; onCreated: (c:any)=>void }) {
  const [text, setText] = useState('');
  const authorId = (typeof window !== 'undefined' && (localStorage.getItem('clientId') || (localStorage.setItem('clientId', crypto.randomUUID()), localStorage.getItem('clientId'))));

  async function submit() {
    if (!text.trim()) return;
    const res = await fetch('/api/cards', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardId, authorId, kind: 'TEXT', text })
    });
    const card = await res.json();
    setText(''); onCreated(card);
  }

  return (
    <div className="flex gap-2">
      <input className="border rounded p-2 w-full" placeholder="무엇이든 적어보세요" value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={submit} className="p-2 rounded bg-black text-white">올리기</button>
    </div>
  );
}
