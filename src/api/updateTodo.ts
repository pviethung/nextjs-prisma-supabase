import { axiosInstance } from '@/api/axiosInstance';
import { Todo } from '@prisma/client';

const updateTodo = async (id: string, title: string) => {
  const res = await axiosInstance<Todo>({
    method: 'POST',
    url: `todos/${id}`,
    data: {
      title
    }
  });
  return res.data;
};

export default updateTodo;
