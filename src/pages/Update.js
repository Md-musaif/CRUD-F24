import React, { useState, useEffect } from 'react';

const UserUpdate = ({ selectedUser, setSelectedUser, setUsers }) => {
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);

  // Update the form fields with the selected user data, but only if selectedUser exists
  useEffect(() => {
    if (selectedUser) {
      setUpdatedUser({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
      });
    }
  }, [selectedUser]);

  // Handle input changes in the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Handle updating user data
  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auth/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert('User Updated successfully!');
        // Update the users list after successful update
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id ? { ...user, ...updatedUser } : user
          )
        );
        setSelectedUser(null); // Close the form
        setUpdatedUser({ name: '', email: '' }); // Reset the update form
      } else {
        // throw new Error(data.message || 'Something went wrong');
        window.alert(data.message || 'Failed to Update user.');

      }
    } catch (err) {
      // setError(err.message);
      window.alert('Internal error',err.message);
    }
  };

  // If no user is selected, return null or an error message
  if (!selectedUser) {
    return <div>No user selected for editing.</div>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleInputChange}
            placeholder={selectedUser.name || 'Enter name'}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
            placeholder={selectedUser.email || 'Enter email'}
          />
        </div>
        <button type="button" onClick={updateUser}>
          Update
        </button>
        <button type="button" onClick={() => setSelectedUser(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserUpdate;
