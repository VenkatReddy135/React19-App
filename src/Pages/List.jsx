import React, { useEffect, useState } from "react";
import useDocumentTitle from "../Hooks/UseDocumentTitle";
import Breadcrumb from "../Components/Breadcrumb";
import { Link } from "react-router-dom";

const List = () => {
  useDocumentTitle();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <Breadcrumb />
      <h2 className="mb-4">Post List</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body.slice(0, 100)}...</p>
                  <Link
                    to={`/post/${post.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
