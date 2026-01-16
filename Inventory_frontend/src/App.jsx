import "./App.css";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import BasicLayout from "./layouts/BasicLayout";
import Login from "./components/login";

function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App;
