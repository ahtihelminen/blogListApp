import React from "react";
import Blog from "../components/Blog";

const BlogRoute = ({ blog, handleLike, handleComment, handleDeleteBlog, username }) => {

  if (!blog) {
    return null
  }
  
  return (
    <div>
      <Blog blog={blog} handleLike={handleLike} handleComment={handleComment} handleDeleteBlog={handleDeleteBlog} username={username} />
    </div>
  )

}

export default BlogRoute