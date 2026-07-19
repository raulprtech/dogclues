import HomePage from '../components/home/HomePage';
import { getHomeContent } from '../lib/content';

export const revalidate = 60;

export default async function Page() {
  const content = await getHomeContent();
  return <HomePage {...content} />;
}
