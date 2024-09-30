import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTodolist = create(
  persist(
    (set) => ({
      todolist: [],
      addTodo: (todo) =>
        set((state) => ({ todolist: [...state.todolist, todo] })),
      removeTodo: (index) =>
        set((state) => {
          const newTodos = [...state.todolist];
          newTodos.splice(index, 1);
          return { todolist: newTodos };
        }),
      removeAll: () => set(() => ({ todolist: [] })),
      updateTodo: (index, value) =>
        set((state) => {
          const updatedTodos = [...state.todolist];
          updatedTodos[index] = value;
          return { todolist: updatedTodos };
        }),
    }),
    { name: "todolistLocal" }
  )
);

export default useTodolist;
