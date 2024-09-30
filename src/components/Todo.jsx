import { useState } from "react";
import useTodolist from "../hooks/useTodolist";

const ToDo = () => {
  const [newTodo, setNewTodo] = useState("");
  const { todolist, addTodo, removeTodo, removeAll, updateTodo } =
    useTodolist();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index) => {
    removeTodo(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleEditTodo = (e, index) => {
    const updatedValue = e.target.innerText.trim();
    if (updatedValue) {
      updateTodo(index, updatedValue);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">ToDo List</h1>
        <div className="space-x-2 mb-4 flex-wrap justify-center sm:flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border rounded p-2"
            placeholder="Add new task"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white p-2 rounded mt-4 sm:mt-0"
          >
            Add
          </button>
          {!!todolist.length && (
            <p
              className="text-center text-red-500 p-2 m-2 cursor-pointer"
              onClick={removeAll}
            >
              Delete All
            </p>
          )}
        </div>
        <ul className="space-y-2 w-1/3">
          {todolist.map((todo, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <p
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => handleEditTodo(e, index)}
                className="editable"
              >
                {todo}
              </p>
              <button
                onClick={() => handleDeleteTodo(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDo;
