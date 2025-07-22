import React, { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import routeConfig from "./Routes/RouteConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AppRoutes = () => useRoutes(routeConfig);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
