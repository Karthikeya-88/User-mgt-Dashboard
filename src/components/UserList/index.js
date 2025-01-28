import React, { Component } from "react";

import "./index.css";

class UserList extends Component {
  render() {
    const { users, onEdit, onDelete } = this.props;
    return (
      <table className="table w-100 pl-4 table-total">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Edit & Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.department}</td>
              <td className="border px-4 py-2">
                <button onClick={() => onEdit(user)} className="edit-btn mr-2">
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="delete-btn ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default UserList;
