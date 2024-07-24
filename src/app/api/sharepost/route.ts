import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {

  // Extract data sent in
  const body = await request.json();
  const { userId, postDetails } = body;

  const newPost = await prisma.post.create({
    data: {
      userId: Number(userId),
      postDetails: String(postDetails),
    },
  });

  console.log(newPost)
  
  // Respond with it
  return Response.json({})

}