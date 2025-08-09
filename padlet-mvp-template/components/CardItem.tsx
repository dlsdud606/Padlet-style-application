'use client';
export default function CardItem({ card }: { card: any }) {
  async function like() {
    await fetch(`/api/cards/${card.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'like' }) });
  }
  return (
    <div className="rounded-xl border p-3 shadow-sm">
      {card.imageUrl ? (<img src={card.imageUrl} alt="" className="rounded mb-2 w-full" />) : null}
      {card.text && <p className="text-sm" style={{whiteSpace:'pre-wrap'}}>{card.text}</p>}
      <div className="text-xs mt-2">
        <button onClick={like} className="p-2 border rounded">👍 {card.likes}</button>
      </div>
    </div>
  );
}
