import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function addTask(e) {
    e.preventDefault();

    if (input.trim() === "") return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);

    setInput("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="app">
      <section className="todo-card">
        <h1>My To-Do List</h1>
        <p className="subtitle">Plan your day. Get things done.</p>

        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="task-summary">
          {tasks.filter((task) => !task.completed).length} tasks remaining
        </div>

        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add your first task!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <label className={task.completed ? "completed" : ""}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  {task.text}
                </label>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;