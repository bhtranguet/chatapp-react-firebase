import { useState } from "react";
import { useGetTodoList, useAddTodo } from "../../queries/queries";

export const ReactQuery = () => {
  const [todo, setTodo] = useState("");
  const { data, isSuccess } = useGetTodoList();
  const { mutate: addTodoMutation } = useAddTodo();

  const addTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    addTodoMutation({ title: todo });
  };

  return (
    <>
      <h1>ReactQuery</h1>
      <div>
        <input
          type="text"
          placeholder="Todos"
          value={todo}
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
      </div>
      <button onClick={(event) => addTodo(event)}>Add Todo</button>
      {isSuccess && data?.map((todo) => <div key={todo.id}>{todo.title}</div>)}
    </>
  );
};
