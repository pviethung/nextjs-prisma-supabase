import { postTodo } from '@/api';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

const Todos = () => {
  const [todo, setTodo] = useState('');
  const { trigger } = useSWRMutation(
    `todos`,
    async (key, { arg }: { arg: string }) => {
      return postTodo(arg);
    }
  );

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await trigger(todo);
          setTodo('');
        }}
      >
        <input
          placeholder="Add something to do"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Todos;
