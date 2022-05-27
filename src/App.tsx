import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={"list"} element={<Home />} />
        <Route path={"historic"} element={<Home completed />} />
        <Route path={"add-task"} element={<AddTask />} />
        <Route path={"id/:id"} element={<Home />} />
        <Route index element={<Navigate to="/list" replace />} />
        <Route path="*" element={<Navigate to="/list" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
