import { useEffect, useState } from "react";

function ToDoListApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    })
      .then((res) => res.json())
      .then((created) => {
        setTodos([...todos, created]);
        setNewTodo("");
      });
  };

  const toggleTodo = (id, completed) => {
    fetch(`http://localhost:4000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTodos(todos.map(t => t.id === id ? updated : t));
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:4000/todos/${id}`, { method: "DELETE" })
      .then(() => {
        setTodos(todos.filter(t => t.id !== id));
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "10px" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoListApp;
