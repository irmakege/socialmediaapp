// pages/api/deletePost.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {

  const body = await request.json();
  const { postId } = body;

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    Response.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    Response.json({ error: 'Unable to delete post' });
  } finally {
    await prisma.$disconnect();
  }
  // Respond with it
  return Response.json({ message: 'Post deleted successfully' });
}