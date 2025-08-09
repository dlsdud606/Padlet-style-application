import { randomUUID } from 'crypto';
export const uuid = () => randomUUID();
export const shortId = () => Math.random().toString(36).slice(2, 8);
