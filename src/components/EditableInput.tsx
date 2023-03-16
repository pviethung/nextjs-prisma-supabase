import { deleteTodo } from '@/api/deleteTodo';
import updateTodo from '@/api/updateTodo';
import { Todo } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';

export const EditableInput = ({ todo }: { todo: Todo }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (inputRef.current && editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div
      onBlur={(e) => {
        setEditing(false);
      }}
      onDoubleClick={(e) => {
        setEditing(true);
      }}
      style={{
        border: '1px solid',
      }}
    >
      {editing ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await updateTodo(todo.id.toString(), input);
            mutate('todos');
            setEditing(false);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      ) : (
        <p>{todo.title}</p>
      )}
      <button
        onClick={async (e) => {
          const newTodos = await deleteTodo(todo.id.toString());
          mutate('todos', newTodos, {
            revalidate: false,
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};
