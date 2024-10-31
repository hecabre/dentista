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
import Supply from "./pages/Supply";
import ProcedureDate from "./pages/ProcedureDate";
import Treatmeant from "./pages/Treatmeant";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <ApiProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute requiredRole="doctor" />}>
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/suministros" element={<Supply />} />
                <Route path="/procedimiento-cita" element={<ProcedureDate />} />
                <Route path="/tratamientos" element={<Treatmeant />} />
              </Route>
              <Route element={<ProtectedRoute requiredRole="recepcionista" />}>
                <Route path="/recepcionista" element={<Recepcionist />} />
              </Route>
            </Routes>
          </ApiProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
