import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    // 토근을 통해 유저정보를 가져옴
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        // api.defaults.headers["authorization"] = "Bearer " + storedToken; /utils/api.js 에서 설정
        const response = await api.get("/users/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogoutClick = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage handleLogoutClick={handleLogoutClick} />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;
