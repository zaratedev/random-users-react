import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [shadedRows, setShadedRows] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=100');
        setUsers(response.data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleShadedRows = () => {
    setShadedRows(prevState => !prevState);
  };

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <button onClick={toggleShadedRows}>Alternar Colores</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Género</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
            <th>País</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.login.uuid} style={{backgroundColor: shadedRows && index % 2 === 0 ? '#112233' : (shadedRows ? '#556677' : 'transparent')}}>
              <td>{`${user.name.first} ${user.name.last}`}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.location.city}</td>
              <td>{user.location.country}</td>
              <td><img src={user.picture.thumbnail} alt="Avatar" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
