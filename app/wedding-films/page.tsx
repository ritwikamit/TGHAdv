import type { Metadata } from 'next';
import { GreenHeritageResortApp } from '@/components/green-heritage-shell';
import { PAGE_ROUTES } from '@/lib/site-routes';

const routeMeta = PAGE_ROUTES.films;

export const metadata: Metadata = {
  title: routeMeta.title,
  description: routeMeta.description,
  alternates: {
    canonical: routeMeta.path,
  },
  openGraph: {
    title: routeMeta.title,
    description: routeMeta.description,
    url: routeMeta.path,
  },
};

export default function WeddingFilmsPage() {
  return <GreenHeritageResortApp initialPage="films" />;
}

