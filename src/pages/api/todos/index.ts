import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface INextApiRequest extends NextApiRequest {
  body: {
    title: string;
  };
}

export default async function handler(
  req: INextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      method,
      body: { title },
    } = req;

    if (method === 'POST') {
      const todo = await prisma.todo.create({
        data: {
          isCompleted: false,
          title,
        },
      });
      res.status(200).json(todo);
      return;
    }

    if (method === 'GET') {
      const todos = await prisma.todo.findMany({
        orderBy: {
          id: 'asc'
        }
      });
      res.status(200).json(todos);
      return;
    }

    res.status(405).json({ erorr: 'Method Not Allowed' });
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
