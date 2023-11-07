import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/Home";
import MyTodos from "@/pages/MyTodos";
import MyTodoLists from "@/pages/MyTodoLists";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-todos">
          <Route index element={<MyTodoLists />} />
          <Route path="/my-todos/:id" element={<MyTodos />} />
        </Route>
      </Routes>
      <Toaster/>
    </QueryClientProvider>
  );
}

export default App;
