import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const signals = await getCollection('signals');
  const protocols = await getCollection('protocols');
  const intercepts = await getCollection('intercepts');
  const artifacts = await getCollection('artifacts');
  const dispatches = await getCollection('dispatches');

  const allContent = [
    ...signals,
    ...protocols,
    ...intercepts,
    ...artifacts,
    ...dispatches,
  ].sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return rss({
    title: 'Mr. Audio Feedback',
    description: 'Encouraging digital ownership. Self-hosting, physical media, right to repair, and practical digital sovereignty.',
    site: context.site,
    items: allContent.map(entry => ({
      title: entry.data.title,
      pubDate: new Date(entry.data.date),
      description: entry.data.desc,
      link: `/${entry.collection}/${entry.id}/`,
    })),
  });
}