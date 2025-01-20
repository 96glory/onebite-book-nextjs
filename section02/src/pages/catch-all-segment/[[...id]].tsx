import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  const { id } = router.query;

  console.log('catch all segment', id);

  return <h1>{id ? `Catch All Segment ${id}` : `Optional Catch All Segment`}</h1>;
}
