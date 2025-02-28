// src/app/unstable_cache_parallel/layout.tsx
import { ReactNode } from 'react';

export async function generateStaticParams() {
  return []; // Tell Next.js not to statically generate this route
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}