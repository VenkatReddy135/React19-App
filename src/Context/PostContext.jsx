import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    { id: uuidv4(), title: "FP", body: "First post" },
    { id: uuidv4(), title: "SP", body: "Second post" },
  ]);
  const addPost = (p) => setPosts((prev) => [...prev, { ...p, id: uuidv4() }]);
  const updatePost = (id, p) =>
    setPosts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const deletePost = (id) =>
    setPosts((prev) => prev.filter((x) => x.id !== id));

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
