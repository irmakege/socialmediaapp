// pages/api/posts.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {

    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        }
    });
    console.log(posts)

    // Respond with it
    return Response.json({ posts: posts });
}
