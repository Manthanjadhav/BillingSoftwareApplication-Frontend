import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import AppContext from "./context/AppContext";

import MenuBar from "./components/MenuBar/MenuBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageItems from "./pages/ManageItems/ManageItems";
import Explore from "./pages/Explore/Explore";
import Login from "./pages/Login/login";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const location = useLocation();
  const { auth } = useContext(AppContext);

  // Login route protection
  const LoginRoute = ({ children }) => {
    return auth.token ? <Navigate to="/dashboard" replace /> : children;
  };

  // Protected route logic
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  return (
    <div>
      {location.pathname !== "/login" && <MenuBar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />

        {/* Admin-only routes */}
        <Route
          path="/category"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <ManageCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <ManageItems />
            </ProtectedRoute>
          }
        />

        {/* Orders - accessible by authenticated users */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          }
        />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
