import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Post from "./components/post/Post";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
