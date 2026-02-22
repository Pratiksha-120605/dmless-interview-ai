import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import { auth } from "./firebase";
import { db, storage } from "./firebase";
import Apply from "./pages/Apply";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/apply/:linkId" element={<Apply />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
