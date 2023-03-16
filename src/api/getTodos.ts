import { axiosInstance } from '@/api/axiosInstance';
import { Todo } from '@prisma/client';

export const getTodos = async () => {
  const res = axiosInstance<Todo[]>({
    url: 'todos',
  });
  return (await res).data;
};
