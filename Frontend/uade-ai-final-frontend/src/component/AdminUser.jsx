import React from 'react';
import { useSelector } from 'react-redux';

const AdminUsuarios = () => {
  const users = useSelector(state => state.auth.users);

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsuarios;
