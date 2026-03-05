import { z } from 'zod';
import { STREAMSchema } from './base.schema';

export const blogPostBaseSchema = z.object({
    id: z.string().cuid(),

    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(255, { message: "Title cannot be longer than 255 characters" }),

    content: z.string()
        .min(1, { message: "Content is required" }),

    slug: z.string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: "Slug must be in URL-friendly format (e.g., 'my-first-post')"
        })
        .max(255),

    coverImage: z.string()
        .url({ message: "Cover image must be a valid URL" })
        .nullable(),

    stream: STREAMSchema,

    officialUrl: z.string()
        .url({ message: "Official URL must be a valid URL" })
        .nullable(),

    published: z.boolean(),

    // Relationships & Timestamps (server-managed)
    authorId: z.string().uuid(), // Matches the User 'id' type
    createdAt: z.date(),
    updatedAt: z.date(),
});


export const createBlogPostSchema = blogPostBaseSchema
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        published: true,
    })


export const updateBlogPostSchema = createBlogPostSchema.partial();

export const blogMetadataSchema = blogPostBaseSchema.pick({
    title: true,
    slug: true,
    createdAt: true,
    coverImage: true
}).extend({
    author: z.object({
        name: z.string().min(1)
    })
})
export type TBlogMetadata = z.infer<typeof blogMetadataSchema>;


// extend the blogMetadataSchema with 'content' from base schema
export const blogData = blogMetadataSchema.extend({
    content: blogPostBaseSchema.shape.content
})
export type TBlogData = z.infer<typeof blogData>



export type TBlogPostBase = z.infer<typeof blogPostBaseSchema>;
export type TCreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type TUpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;

