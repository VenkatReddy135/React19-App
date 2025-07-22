import React from "react";
import useDocumentTitle from "../Hooks/UseDocumentTitle";
import Breadcrumb from "../Components/Breadcrumb";

const Details = () => {
  useDocumentTitle();

  return (
    <div className="container">
      <Breadcrumb />
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title">Admin Details Page</h3>
          <p className="card-text">
            This page is only accessible to admin users. You can use it to view
            sensitive details, statistics, or admin-only reports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
