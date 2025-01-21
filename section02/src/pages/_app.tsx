import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    router.push('/test');
  };

  // programtic하게 라우팅 되는 페이지를 프리페치하는 방법
  useEffect(() => {
    router.prefetch('/test');
  }, []);

  return (
    <>
      <header>
        <Link href="/">index</Link>
        &nbsp;
        {/* 프리페치 해제 */}
        <Link href="/search" prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href="/book/1">book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
