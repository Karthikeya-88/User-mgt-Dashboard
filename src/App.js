import React, { Component } from "react";
import axios from "axios";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    formData: { firstName: "", lastName: "", email: "", department: "" },
    isEditing: false,
    modalOpen: false,
    error: null,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = response.data.map((user) => ({
        id: user.id,
        firstName: user.name.split(" ")[0] || "",
        lastName: user.name.split(" ")[1] || "",
        email: user.email,
        department: "General",
      }));
      this.setState({ users });
    } catch (error) {
      this.setState({ error: "Failed to fetch users." });
    }
  };

  handleAddUser = () => {
    this.setState({
      formData: { firstName: "", lastName: "", email: "", department: "" },
      isEditing: false,
      modalOpen: true,
    });
  };

  handleEditUser = (user) => {
    this.setState({ formData: user, isEditing: true, modalOpen: true });
  };

  handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState({
        users: this.state.users.filter((user) => user.id !== id),
      });
    } catch (error) {
      this.setState({ error: "Failed to delete user." });
    }
  };

  handleFormChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { formData, isEditing, users } = this.state;
    try {
      if (isEditing) {
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${formData.id}`,
          formData
        );
        this.setState({
          users: users.map((user) =>
            user.id === formData.id ? formData : user
          ),
        });
      } else {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          formData
        );
        this.setState({
          users: [...users, { ...formData, id: response.data.id }],
        });
      }
      this.setState({ modalOpen: false });
    } catch (error) {
      this.setState({ error: "Failed to submit form." });
    }
  };

  render() {
    const { users, formData, modalOpen, error } = this.state;

    return (
      <>
        <div className="p-4 main-container">
          <h2 className="font-bold mb-4 user-heading">
            User Management System
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={this.handleAddUser}
            className="bg-green-500 text-dark px-2 py-2 mb-4 add-user text-white"
          >
            Add User
          </button>

          {modalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <UserForm
                  formData={formData}
                  onChange={this.handleFormChange}
                  onSubmit={this.handleFormSubmit}
                  onCancel={() => this.setState({ modalOpen: false })}
                />
              </div>
            </div>
          )}

          <UserList
            users={users}
            onEdit={this.handleEditUser}
            onDelete={this.handleDeleteUser}
          />
        </div>
      </>
    );
  }
}

export default App;
