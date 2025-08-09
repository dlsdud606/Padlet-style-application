'use client';
import { upload } from '@vercel/blob/client';
import { useState } from 'react';

export default function ImageUploader({ boardId, onUploaded }: { boardId: string; onUploaded: (card:any)=>void }) {
  const [busy, setBusy] = useState(false);
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return alert('최대 10MB까지 업로드 가능합니다');
    setBusy(true);
    try {
      const { url } = await upload(file.name, file, { access: 'public' });
      const res = await fetch('/api/cards', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boardId, authorId: localStorage.getItem('clientId'), kind: 'IMAGE', imageUrl: url })
      });
      const card = await res.json();
      onUploaded(card);
    } finally { setBusy(false); (e.target as any).value = ''; }
  }
  return (
    <label className="inline-flex items-center gap-2 text-sm border rounded p-2 cursor-pointer">
      <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={busy} />
      {busy ? '업로드 중…' : '이미지 업로드'}
    </label>
  );
}
