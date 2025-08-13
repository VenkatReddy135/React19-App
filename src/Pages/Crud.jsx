import React from "react";
import { useAuth } from "../Context/AuthContext";
import useDocumentTitle from "../Hooks/UseDocumentTitle";
import { PostProvider } from "../Context/PostContext";
import Breadcrumb from "../Components/Breadcrumb";
import CrudManager from "../Components/CrudManager";
import PostList from "../Components/PostList";

const Crud = () => {
  useDocumentTitle();
  const { role } = useAuth();

  return (
    <PostProvider>
      <div className="container">
        <Breadcrumb />
        {role === "admin" && (
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <CrudManager />
            </div>
          </div>
        )}
        <div className="card shadow-sm">
          <div className="card-body">
            <PostList />
          </div>
        </div>
      </div>
    </PostProvider>
  );
};

export default Crud;
