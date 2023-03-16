import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface INextApiRequest extends NextApiRequest {
  body: {
    title: string;
  };
  query: {
    id: string;
  };
}

export default async function handler(
  req: INextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      method,
      query: { id },
      body: { title },
    } = req;
    if (method === 'POST') {
      const updatedTodo = await prisma.todo.update({
        where: {
          id: +id,
        },
        data: {
          title,
        },
      });
      res.status(200).json(updatedTodo);
      return;
    }
    if (method === 'DELETE') {
      await prisma.todo.delete({
        where: {
          id: +id,
        },
      });
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
      return;
    }
  } catch (error) {}
}
