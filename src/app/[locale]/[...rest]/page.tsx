import { notFound } from 'next/navigation';

export default async function CatchAll() {
  return notFound();
}
