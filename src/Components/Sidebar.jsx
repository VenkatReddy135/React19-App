import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  const { role } = useAuth();
  const links = [
    { label: "Posts",   path: "/list",         roles: ["admin", "user"] },
    { label: "Details", path: "/list/details", roles: ["admin"] },
    { label: "CRUD",    path: "/crud",         roles: ["admin", "user"] },
  ];

  return (
    <aside
      className="shadow-sm vh-47 p-4 d-flex flex-column justify-content-start"
    >
      <h5 className="mb-4 text-primary">Main Menu</h5>

      <div className="d-grid gap-3">
        {links
          .filter(link => link.roles.includes(role))
          .map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="btn btn-outline-primary btn-lg text-start"
            >
              {link.label}
            </Link>
          ))
        }
      </div>

      <div className="mt-auto pt-4 border-top">
        <small className="text-muted">Logged in as <strong>{role}</strong></small>
      </div>
    </aside>
  );
}