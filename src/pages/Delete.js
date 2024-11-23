import React from 'react';

const DeleteUser = ({ userId, setUsers }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auth/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        window.alert('User deleted successfully!');
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        window.alert(data.message || 'Failed to delete user.');
      }
    } catch (error) {
      window.alert('Internal error');
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteUser;
