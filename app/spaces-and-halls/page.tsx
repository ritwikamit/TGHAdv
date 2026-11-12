import type { Metadata } from 'next';
import { GreenHeritageResortApp } from '@/components/green-heritage-shell';
import { PAGE_ROUTES } from '@/lib/site-routes';

const routeMeta = PAGE_ROUTES.installations;

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

export default function SpacesAndHallsPage() {
  return <GreenHeritageResortApp initialPage="installations" />;
}

