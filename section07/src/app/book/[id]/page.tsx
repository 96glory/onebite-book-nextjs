import { createReviewAction } from '@/actions/create-review.action';
import { notFound } from 'next/navigation';
import style from './page.module.css';

// export const dynamicParams = false; // generateStaticParams 내 값만 허용하고 싶을 때 false로 설정

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function BookDetail({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error();
    // return <div>오류가 발생했습니다 ...</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor({ id }: { id: string }) {
  return (
    <section>
      <form action={createReviewAction}>
        <input name="bookId" value={id} hidden readOnly />
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail id={id} />
      <ReviewEditor id={id} />
    </div>
  );
}
