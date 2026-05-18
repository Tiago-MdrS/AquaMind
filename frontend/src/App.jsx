import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Desafios from "./pages/Desafios";
import Ranking from "./pages/Ranking";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

// 1. Importe o Provider (ajuste o caminho da pasta se necessário)
import { WaterProvider } from "./context/WaterContext"; 

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <WaterProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/desafios"
            element={
              <PrivateRoute>
                <Desafios />
              </PrivateRoute>
            }
          />

          <Route
            path="/ranking"
            element={
              <PrivateRoute>
                <Ranking />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </WaterProvider>
    </BrowserRouter>
  );
}