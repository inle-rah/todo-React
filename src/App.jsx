import React, { useState } from "react";

import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodo } from "./components/IncompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";
// ファイル名と使用名は必ず同じ

export const App = () => {
  // 追加入力欄を空に
  const [todoText, setTodoText] = useState("");
  // 未完了欄
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了欄
  const [completeTodos, setCompleteTodos] = useState([]);

  // event;inputがonchangeで変更があった場合に受け取る値
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタン
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 削除ボタン
  const onClickDel = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); // index番目から1個削除
    setIncompleteTodos(newTodos);
  };

  // 完了ボタン
  const onClickComp = (index) => {
    const newIncompTodos = [...incompleteTodos];
    newIncompTodos.splice(index, 1);

    const newCompTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompTodos);
    setCompleteTodos(newCompTodos);
  };

  // 戻すボタン
  const onClickReturn = (index) => {
    const newCompTodos = [...completeTodos];
    newCompTodos.splice(index, 1);

    const newIncompTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompTodos);
    setIncompleteTodos(newIncompTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length + completeTodos.length >= 5}
      />
      {incompleteTodos.length + completeTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録可能タスクは 5 までです</p>
      )}
      <IncompleteTodo
        todos={incompleteTodos}
        onClickComp={onClickComp}
        onClickDel={onClickDel}
      />
      <CompleteTodo todos={completeTodos} onClickReturn={onClickReturn} />
    </>
  );
};
