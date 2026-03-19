import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const contentSchema = z.object({
  title: z.string(),
  date: z.string(),
  youtubeId: z.string().optional(),
  image: z.string(),optional(),
  desc: z.string(),
  number: z.string(),
  tag: z.string().optional(),
});

const collectionConfig = (folder: string) => defineCollection({
  loader: glob({ pattern: '**/*.md', base: `./src/content/${folder}` }),
  schema: contentSchema,
});

export const collections = {
  signals: collectionConfig('signals'),
  protocols: collectionConfig('protocols'),
  intercepts: collectionConfig('intercepts'),
  artifacts: collectionConfig('artifacts'),
  dispatches: collectionConfig('dispatches'),
};