'use client';

import { ReactNode } from 'react';

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log('client component');

  return <div>{children}</div>;
}
