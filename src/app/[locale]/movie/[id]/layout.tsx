import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movieee',
  description:
    'codingbeautydev.com: Coding - the art, the science, and the passion.',
};

export default async function SerieLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  console.log('userAgent');

  return <>{children}</>;
}
