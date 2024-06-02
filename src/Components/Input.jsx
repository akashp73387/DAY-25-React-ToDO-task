import React, { useState } from "react";
import "./Input.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [editMode, setEditMode] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("not completed"); // default should be not completed

  const handleAddTodo = () => {
    if (!taskName.trim()) return;
    const newTodo = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: "not completed",
    };
    setTodos([...todos, newTodo]);
    setTaskName("");
    setTaskDescription("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, name, description, status) => {
    setEditMode(id);
    setEditTaskName(name);
    setEditTaskDescription(description);
    setEditTaskStatus(status);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editMode
        ? {
            ...todo,
            name: editTaskName,
            description: editTaskDescription,
            status: editTaskStatus,
          }
        : todo
    );
    setTodos(updatedTodos);
    setEditMode(null);
    setEditTaskName("");
    setEditTaskDescription("");
    setEditTaskStatus(""); // reset status to default value
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.status === "completed";
    if (filter === "notCompleted") return todo.status === "not completed";
    return true;
  });

  return (
    <div>
      <h1 className="mt-3 mb-4">Todo App</h1>
      <div className="container input-container">
        <div className="row ">
          <input
            className="col-md-5 col-sm-10 col-10 ms-4"
            type="text"
            placeholder="Task Name"
            value={editMode !== null ? editTaskName : taskName}
            onChange={(e) =>
              editMode !== null
                ? setEditTaskName(e.target.value)
                : setTaskName(e.target.value)
            }
          />

          <input
            className="col-md-5 col-sm-10 col-10  ms-4"
            type="text"
            placeholder="Task Description"
            value={editMode !== null ? editTaskDescription : taskDescription}
            onChange={(e) =>
              editMode !== null
                ? setEditTaskDescription(e.target.value)
                : setTaskDescription(e.target.value)
            }
          />
          {editMode !== null ? (
            <select
              className="col-md-2 col-sm-6 col-5 update-status ms-4  "
              value={editTaskStatus}
              onChange={(e) => setEditTaskStatus(e.target.value)}
            >
              <option value="not completed">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
          ) : null}
          {editMode !== null ? (
            <button
              className="btn btn-info ms-5 col-md-2 col-sm-6 col-2  update-btn "
              onClick={handleUpdateTodo}
            >
              Update Todo
            </button>
          ) : (
            <button
              className="col-md-4 col-sm-6 col-4 ms-4 btn btn-success text-center"
              onClick={handleAddTodo}
            >
              Add Todo
            </button>
          )}
        </div>
      </div>

      <div className="options-class col-6">
        <p
          style={{ textShadow: "5px 5px 10px orangered" }}
          className="text col-12 col-md-12"
        >
          My todos
        </p>
        <div className="col-6">
          <p
            style={{ textShadow: "5px 5px 10px orangered" }}
            className="text col-12 col-md-12 "
          >
            Select Filters : &nbsp;
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="notCompleted">Not Completed</option>
            </select>
          </p>
        </div>
      </div>

      <div className="m-5 details">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className={`card ${
              todo.status === "completed" ? "completed" : "not-completed"
            }`}
          >
            <div>
              <div className="card-head">
                <h5>Name: {todo.name}</h5>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <h5>Description: </h5>
                  {todo.description}
                </div>
              </div>
            </div>

            <p>
              <br />
              <h5>Status:</h5>
              <select
                className="slect-status"
                value={todo.status}
                onChange={(e) => handleStatusChange(todo.id, e.target.value)}
              >
                <option value="not completed">Not Completed</option>
                <option value="completed">Completed</option>
              </select>
            </p>

            <button
              className="edit-button"
              onClick={() =>
                handleEditTodo(
                  todo.id,
                  todo.name,
                  todo.description,
                  todo.status
                )
              }
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="delete-button "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
