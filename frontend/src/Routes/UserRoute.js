import React from "react";
import Headers from "../components/Headers";

const UserRoute = ({ users }) => {

  const user = users[0]

  if (!user) {
    return null
  }

  return (
    <div>
      <Headers.two value={user.name} />
      <Headers.three value={'added blogs'} />
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )  
}

export default UserRoute