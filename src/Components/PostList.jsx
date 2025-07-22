import React, { useState, useMemo } from "react";
import { usePost } from "../Context/PostContext";

const POSTS_PER_PAGE = 5;

export default function PostList() {
  const { posts } = usePost();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.body.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, posts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage, filteredPosts]);

  return (
    <div>
      <h5 className="mb-3">Post Viewer</h5>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by title or body..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reset to page 1 on search
        }}
      />

      {paginatedPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="list-group mb-3">
          {paginatedPosts.map((post) => (
            <li key={post.id} className="list-group-item">
              <strong>{post.title}</strong>
              <p className="mb-0">{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              <button className="page-link">{page}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
