import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuideView from '../../../components/guide/GuideView';
import { getCategories, getGuide, getGuides, getPlaces, getSponsors } from '../../../lib/content';

export const revalidate = 60;

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    openGraph: { title: guide.title, description: guide.description, images: [guide.coverImageUrl] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [guide, allPlaces, categories, sponsors] = await Promise.all([getGuide(slug), getPlaces(), getCategories(), getSponsors()]);
  if (!guide) notFound();
  const places = allPlaces.filter((place) => guide.places.includes(place.id));
  const sponsor = sponsors.find((item) => item.id === guide.sponsorId);
  return <GuideView guide={guide} places={places} categories={categories} sponsor={sponsor} />;
}
