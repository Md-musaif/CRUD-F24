import React, { useState, useEffect } from 'react';
import UserUpdate from './Update'; // Import the UserUpdate component
import DeleteUser from './Delete'; // Import the DeleteUser component

const UserList = () => {
  // Define state to store the user data, loading state, error state, and selected user for editing
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // For editing user

  // Fetch user data from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/list'); // Replace with your API URL
      const data = await response.json();

      if (response.ok) {
        setUsers(data.user);
        setLoading(false);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch user data when the component mounts
  }, []);

  // Handle loading, errors, and display data
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Signup List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => setSelectedUser(user)}>Edit</button>
                <DeleteUser userId={user._id} setUsers={setUsers} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <UserUpdate
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

export default UserList;
