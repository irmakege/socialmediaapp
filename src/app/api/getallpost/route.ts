// pages/api/getUserData.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request)
   {

  const body = await request.json();
  const { userId } = body;

  const userPosts = await prisma.post.findMany({
    where: {
      userId: userId,
    },
    select: {
      postDetails: true,
    }
  });

  // Respond with it
  return Response.json({posts: userPosts})
}