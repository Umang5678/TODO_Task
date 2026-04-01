import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../features/todos/todoslice";

export default function Todos() {
  const [text, setText] = useState(" ");
  const dispatch = useDispatch();
  const todos = useSelector((s) => s.Todos.items);

  return (
    <div>
      <input onChange={(e) => setText(e.target.value)} />
      <button onclick={() => dispatch(addTodo(text))}>Add</button>

      {todos.map((t) => (
        <div key={t.id}>
          {t.text}
          <button onClick={() => dispatch(deleteTodo(t.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
