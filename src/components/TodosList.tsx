import { getTodos } from '@/api';
import { EditableInput } from '@/components/EditableInput';
import useSWR from 'swr';

const TodosList = () => {
  const { data: todos } = useSWR('todos', getTodos);

  if (!todos || todos.length === 0) return <></>;
  return (
    <div>
      {todos.map((todo) => {
        return <EditableInput todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default TodosList;
