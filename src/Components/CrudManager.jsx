import React, { useState } from "react";
import { usePost } from "../Context/PostContext";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

const CrudManager = () => {
  const { posts, addPost, updatePost, deletePost } = usePost();
  const { userId } = useAuth(); // ✅ Dynamic userId from AuthContext
  console.log(userId);

  const [form, setForm] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", body: "" });
  const [deleteId, setDeleteId] = useState(null);

  // Add Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.body) return;

    try {
      const res = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }), // ✅ userId included
      });

      if (!res.ok) throw new Error("Failed to add post");

      const newPost = await res.json();
      addPost({ ...newPost, id: newPost.id || Math.random().toString() });
      setForm({ title: "", body: "" });
      toast.success("Post added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save post.");
    }
  };

  // Edit Post
  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/posts/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editForm, userId }), // ✅ userId included
      });

      if (!res.ok) throw new Error("Failed to update post");

      const updated = await res.json();
      updatePost(editId, updated);
      toast.success("Post updated!");
      setEditId(null);
      setEditForm({ title: "", body: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post.");
    }
  };

  // Delete Post
  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/posts/${deleteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }), // ✅ userId included
      });

      if (!res.ok) throw new Error("Failed to delete post");

      deletePost(deleteId);
      toast.warn("Post deleted!");
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="container mb-5">
      <h5 className="mb-3">Add Post</h5>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>

      <h5 className="mb-3">All Posts</h5>
      {posts.map((post) => (
        <div className="card mb-2" key={post.id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => {
                setEditId(post.id);
                setEditForm({ title: post.title, body: post.body });
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setDeleteId(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editId && (
        <div className="modal show d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Post</h5>
                <button onClick={() => setEditId(null)} className="btn-close" />
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <textarea
                  className="form-control"
                  value={editForm.body}
                  onChange={(e) =>
                    setEditForm({ ...editForm, body: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setEditId(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button onClick={handleUpdate} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal show d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  onClick={() => setDeleteId(null)}
                  className="btn-close"
                />
              </div>
              <div className="modal-body">
                Are you sure you want to delete this post?
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setDeleteId(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudManager;
