import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useDocumentTitle from "../Hooks/UseDocumentTitle";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useDocumentTitle(`Post #${id}`);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setPost(null);
        setLoading(false);
      });
  }, [id]);

  if (!loading && !post) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger">Post Not Found</h2>
        <Link to="/list" className="btn btn-outline-secondary mt-3">
          ← Back to List
        </Link>
      </div>
    );
  }

  if (!post) return <div className="text-primary">Loading...</div>;

  return (
    <div className="container text-white">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Link to="/list" className="btn btn-secondary">
        ← Back to List
      </Link>
    </div>
  );
};

export default PostDetails;
