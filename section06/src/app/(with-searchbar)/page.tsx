import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';
import style from './page.module.css';

/**
 * 특정 페이지의 유형을 강재로 static, dynamic 페이지로 설정
 * 1) auto : 기본값, 아무것도 강제하지 않음
 * 2) force-dynamic : 페이지를 강제로 dynamic 페이지로 설정
 * 3) force-static : 페이지를 강제로 static 페이지로 설정
 * 4) error : 페이지를 강제로 static 페이지로 설정, static으로 설정하면 안되는 이유가 있을 때 build error
 */
export const dynamic = 'force-dynamic';

async function AllBooks() {
  await delay(1500);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' },
  );

  // if (!response.ok) {
  //   return <div>오류가 발생했습니다 ...</div>;
  // }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } },
  );

  // if (!response.ok) {
  //   return <div>오류가 발생했습니다 ...</div>;
  // }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={5} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
