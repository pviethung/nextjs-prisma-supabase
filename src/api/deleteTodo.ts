import { axiosInstance } from '@/api/axiosInstance';
import { Todo } from '@prisma/client';

export const deleteTodo = async (id: string) => {
  const res = axiosInstance<Todo[]>({
    method: 'DELETE',
    url: `todos/${id}`,
  });
  return (await res).data;
};
