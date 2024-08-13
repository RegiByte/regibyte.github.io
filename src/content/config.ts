import { defineCollection, z } from 'astro:content';

const effectSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  canvasCount: z.number().int().optional(),
  disabled: z.boolean().optional(),
});
export type Effect = z.infer<typeof effectSchema>;
const effectCollection = defineCollection({
  schema: effectSchema,
});

const animationsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  disabled: z.boolean().optional(),
});
export type AnimationScene = z.infer<typeof animationsSchema>;
const animationCollection = defineCollection({
  schema: animationsSchema,
});

export const collections = {
  effects: effectCollection,
  threeD: animationCollection,
};
