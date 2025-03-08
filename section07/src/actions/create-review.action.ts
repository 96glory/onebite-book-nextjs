'use server';

import { revalidateTag } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ content, author, bookId }),
      },
    );

    console.log(response.status);

    // 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('/book/[id]', 'page');

    // 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath('/(with-searchbar)', 'layout');

    // 모든 데이터 재검증
    // revalidatePath('/', 'layout');

    // 태그 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
