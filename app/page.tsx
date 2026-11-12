import type { Metadata } from 'next';
import { GreenHeritageResortApp } from '@/components/green-heritage-shell';
import { buildPageMetadata } from '@/lib/site-routes';

export const metadata: Metadata = buildPageMetadata('home');

export default function HomePage() {
  return <GreenHeritageResortApp initialPage="home" />;
}
