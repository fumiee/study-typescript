import type { NextPage } from 'next';
import { ChangeEventHandler, useState, VFC } from 'react';

type Todo = {
  id: number;
  label: string;
  isDone: boolean;
};

const Home: NextPage = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const toggleTodo: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === Number(e.target.value)) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
    });
  };
  const input: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const add = () => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: todos.length + 1, label: text, isDone: false },
      ];
    });
    setText('');
  };
  return (
    <div className='w-96 mx-auto p-20'>
      <h1 className='text-xl font-bold'>todo</h1>
      <div className='flex gap-2'>
        <input
          type='text'
          value={text}
          onChange={input}
          className='border border-black'
        />
        <button
          onClick={add}
          className='border border-black flex-shrink-0 px-2'
        >
          追加
        </button>
      </div>
      <ul className='mt-4 space-y-2'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <ListItem todo={todo} toggleTodo={toggleTodo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ListItem: VFC<{
  todo: Todo;
  toggleTodo: ChangeEventHandler<HTMLInputElement>;
}> = ({ todo, toggleTodo }) => {
  return (
    <label className='flex items-center gap-x-2'>
      <input
        type='checkbox'
        value={todo.id}
        checked={todo.isDone}
        onChange={toggleTodo}
      ></input>
      <span>{todo.label}</span>
    </label>
  );
};

export default Home;
