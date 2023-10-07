import React, { useState } from "react";
import "./Input.css";

function Input() {
  const [todo, setTodo] = useState("");
  const [todoList, setList] = useState([]);

  const addTodo = () => {
    if (todo) {
      let temp = todoList;
      temp.push({ task: todo, id: Date.now() });

      setList([...temp]);
      console.log(todo);
      console.log(todoList);
      setTodo("");
    }
  };

  const removeTodo = (id) => {
    let temp = todoList.filter((t) => {
      return t.id !== id;
    });
    setList([...temp]);
  };

  return (
    <div className="main-box ">
      <div className="main-container">
        <div>
          <h3 className="todo-text">ToDo-App</h3>
        </div>
        <div className="input-box">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="input-task"
          ></input>
          <button onClick={addTodo} className="btn">
            Add
          </button>
        </div>
        <div className="input-display">
          {todoList.map((t) => {
            return (
              <div key={t.id} className="input-enter">
                {t.task}
                <button
                  className="btn"
                  onClick={() => {
                    removeTodo(t.id);
                  }}
                >
                  Del
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Input;
