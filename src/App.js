import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updatedTodo = todos.map((t) =>
        t.id === editId ? { id: t.id, todo } : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodo);
      setEditId("");
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const deltoDo = todos.filter((to) => to.id !== id);
    setTodos([...deltoDo]);
  };
  const handleEdit = (id) => {
    const editTodo = todos.find((ti) => ti.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  const moveList = (i, action) => {
    const updatedTodos = [...todos];
    const temp = todos[i];
    if (action === "up" && i > 0) {
      updatedTodos[i] = updatedTodos[i - 1];
      updatedTodos[i - 1] = temp;
    } else if (action === "down" && i < updatedTodos.length - 1) {
      updatedTodos[i] = updatedTodos[i + 1];
      updatedTodos[i + 1] = temp;
    }
    setTodos(updatedTodos);
  };
  return (
    <div className="main-box">
      <div className="container">
        <h1>ToDo List App</h1>
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "Edit" : "Go"}</button>
        </form>
        <ul className="all-todos">
          {todos.map((t, i) => (
            <li className="single-todo" key={t.id}>
              <span className="todo-text">{t.todo}</span>
              <button className="up" onClick={() => moveList(i, "up")}>
                up
              </button>
              <button className="down" onClick={() => moveList(i, "down")}>
                Down
              </button>
              <button className="edit" onClick={() => handleEdit(t.id)}>
                Edit
              </button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
