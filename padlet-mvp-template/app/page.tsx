'use client';
import { useState } from 'react';

export default function Page() {
  const [title, setTitle] = useState('나의 첫 보드');
  const [adminUrl, setAdminUrl] = useState<string|null>(null);

  async function createBoard() {
    const res = await fetch('/api/boards', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ title }) });
    const data = await res.json();
    setAdminUrl(data.adminUrl);
    window.location.href = data.url;
  }

  return (
    <main className="container space-y-4">
      <h1 className="text-2xl">무가입 그리드 보드</h1>
      <div className="flex gap-2">
        <input className="border rounded p-2 w-full" value={title} onChange={e=>setTitle(e.target.value)} />
        <button className="p-2 rounded bg-black text-white" onClick={createBoard}>보드 만들기</button>
      </div>
      {adminUrl && <p className="text-xs">관리자 링크(저장): {adminUrl}</p>}
    </main>
  );
}
