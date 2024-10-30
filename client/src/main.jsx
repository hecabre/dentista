import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./context/AuthContext";
import Doctor from "./pages/Doctor";
import Recepcionist from "./pages/Recepcionist";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ApiProvider } from "./context/ApiContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ApiProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute requiredRole="doctor" />}>
                <Route path="/doctor" element={<Doctor />} />
              </Route>
              <Route element={<ProtectedRoute requiredRole="recepcionista" />}>
                <Route path="/recepcionista" element={<Recepcionist />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ApiProvider>
    </AuthProvider>
  </StrictMode>
);
