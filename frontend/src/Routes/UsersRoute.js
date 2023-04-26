import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { Link } from 'react-router-dom'

import Headers from "../components/Headers";

const UsersRoute = ({ users }) => {
  return (
    <div>
      <Headers.two value={'Users'} />
      <table>
        <thead>
          <tr>
            <td></td>
            <td><Headers.three value={'blogs created'}/></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default UsersRoute