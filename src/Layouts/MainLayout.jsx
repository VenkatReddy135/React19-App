import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useAuth } from "../Context/AuthContext";

const MainLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light min-vh-0 p-3 border-end">
          <h4>Welcome!</h4>
          <p>{user?.email}</p>
          <Sidebar />
          <button className="btn btn-danger mt-4" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Page content */}
        <div className="col-md-9 bg-dark p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
