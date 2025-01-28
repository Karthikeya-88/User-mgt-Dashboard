import React, { Component } from "react";

import "./index.css";

class UserForm extends Component {
  render() {
    const { formData, onChange, onSubmit, onCancel } = this.props;
    return (
      <form onSubmit={onSubmit} className="p-4 border user-form">
        <div className="mb-4">
          <label className="block mb-2 user-label">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            className="border p-2 w-full user-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 user-label">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            className="border p-2 w-full user-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 user-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="border p-2 w-full user-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 user-label">Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={onChange}
            className="border p-2 w-full user-input"
            required
          />
        </div>
        <button type="submit" className="text-black submit-btn">
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-black cancel-btn"
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;
