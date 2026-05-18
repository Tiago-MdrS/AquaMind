import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Desafios from "./pages/Desafios";
import Ranking from "./pages/Ranking";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

import { WaterProvider } from "./context/WaterContext";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

function CenteredPage({ children }) {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-7xl px-4">{children}</div>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#061622] text-white">
      {!isLoginPage && <Navbar />}

      <main className={!isLoginPage ? "min-h-screen w-full pt-24 pb-10" : "min-h-screen w-full"}>
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
            path="/desafios"
            element={
              <PrivateRoute>
                <Desafios />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <CenteredPage>
                  <Dashboard />
                </CenteredPage>
              </PrivateRoute>
            }
          />

          <Route
            path="/ranking"
            element={
              <PrivateRoute>
                <CenteredPage>
                  <Ranking />
                </CenteredPage>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <WaterProvider>
        <AppLayout />
      </WaterProvider>
    </BrowserRouter>
  );
}