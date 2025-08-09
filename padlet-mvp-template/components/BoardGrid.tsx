'use client';
import Masonry from 'react-masonry-css';
import { useEffect, useState } from 'react';
import CardItem from './CardItem';

export default function BoardGrid({ initial, boardId }: { initial: any[]; boardId: string }) {
  const [cards, setCards] = useState(initial);

  useEffect(() => {
    const es = new EventSource(`/api/stream/${boardId}`);
    es.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'card_created') setCards(prev => [msg.payload, ...prev]);
      if (msg.type === 'card_updated') setCards(prev => prev.map(c => c.id === msg.payload.id ? msg.payload : c));
      if (msg.type === 'card_deleted') setCards(prev => prev.filter(c => c.id !== msg.payload.id));
    };
    return () => es.close();
  }, [boardId]);

  const bp = { default: 4, 1100: 3, 700: 2, 500: 1 };
  return (
    <Masonry breakpointCols={bp} className="flex w-full gap-4" columnClassName="bg-transparent">
      {cards.filter(c=>!c.isHidden).map(card => <CardItem key={card.id} card={card} />)}
    </Masonry>
  );
}
