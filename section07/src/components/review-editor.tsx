'use client';

import { createReviewAction } from '@/actions/create-review.action';
import { useActionState, useEffect } from 'react';
import style from './review-editor.module.css';

export default function ReviewEditor({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={id} hidden readOnly />
        <textarea
          required
          disabled={isPending}
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            required
            disabled={isPending}
            name="author"
            placeholder="작성자"
          />
          <button type="submit" disabled={isPending}>
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
