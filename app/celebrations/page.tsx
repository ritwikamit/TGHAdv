import type { Metadata } from 'next';
import { GreenHeritageResortApp } from '@/components/green-heritage-shell';
import { buildPageMetadata } from '@/lib/site-routes';

export const metadata: Metadata = buildPageMetadata('commissions');

export default function CelebrationsPage() {
  return <GreenHeritageResortApp initialPage="commissions" />;
}

