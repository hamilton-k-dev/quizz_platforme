import TakeQuizClient from './TakeQuizClient';

export function generateStaticParams() {
  return [
    { id: '1' }, { id: '2' }, { id: '3' },
    { id: '4' }, { id: '7' }, { id: '8' },
  ];
}

export default async function TakeQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TakeQuizClient quizId={id} />;
}
