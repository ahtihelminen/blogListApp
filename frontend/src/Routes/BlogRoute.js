import React from "react";
import Blog from "../components/Blog";

const BlogRoute = ({ blog, handleLike, handleDeleteBlog, username }) => {

  return (
    <div>
      <Blog blog={blog} handleLike={handleLike} handleDeleteBlog={handleDeleteBlog} username={username} />
    </div>
  )

}

export default BlogRoute