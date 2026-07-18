import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideView from '../../../components/guide/GuideView';
import { GUIDE_EDITIONS } from '../../../lib/data';

export function generateStaticParams() {
  return GUIDE_EDITIONS.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDE_EDITIONS.find((item) => item.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    openGraph: { title: guide.title, description: guide.description, images: [guide.coverImageUrl] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!GUIDE_EDITIONS.some((guide) => guide.slug === slug)) notFound();
  return <GuideView />;
}
