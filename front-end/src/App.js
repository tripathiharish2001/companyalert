import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import { useState } from "react";
import { TaskContextProvider } from "./context/TasksContext";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        {/* <TaskContextProvider> */}
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        {/* </TaskContextProvider> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
