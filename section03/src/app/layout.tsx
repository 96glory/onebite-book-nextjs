import Link from 'next/link';
import './globals.css';
import style from './layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href="/">📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <footer>제작 @glory</footer>
        </div>
      </body>
    </html>
  );
}
