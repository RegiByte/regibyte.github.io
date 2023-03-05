import {defineCollection, z} from "astro:content"

const effectCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
        tags: z.array(z.string()),
        image: z.string().optional(),
        canvasCount: z.number().int().optional()
    })
})

export const collections = {
    'effects': effectCollection
}