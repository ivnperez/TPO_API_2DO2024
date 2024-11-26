import React from 'react';
import { useSelector } from 'react-redux';

const AdminUser = () => {
  const users = useSelector(state => state.auth.users); // Aca sacamos desde el estado global de redux la lista de usuarios

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <ul>
        {users.map(user => ( // El user.map es el que itera sobre la lista de usuarios
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUser;
