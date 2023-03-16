import { axiosInstance } from '@/api/axiosInstance';
import { Todo } from '@prisma/client';

export const postTodo = async (title: string) => {
  const res = axiosInstance<Todo>({
    method: 'POST',
    url: 'todos',
    data: {
      title,
    },
  });

  return (await res).data;
};
