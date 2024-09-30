import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToDo from "./components/Todo";
import { useState } from "react";
import { Posts } from "./components/Posts";

const queryClient = new QueryClient();

function App() {
  const [toggle, setToggle] = useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <button onClick={() => setToggle(!toggle)} className="p-4 font-bold">
        Change App
      </button>
      {toggle ? <ToDo /> : <Posts />}
    </QueryClientProvider>
  );
}

export default App;
