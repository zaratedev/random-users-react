import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [shadedRows, setShadedRows] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [deletedUsers, setDeletedUsers] = useState([]);

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

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const getField = (obj, field) => {
    const keys = field.split('.');
    return keys.reduce((acc, curr) => acc && acc[curr], obj);
  };

  const sortByField = (field) => {
    setSortField(field);
    toggleSortOrder();
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortField) {
      const fieldValueA = typeof getField(a, sortField) === 'string' ? getField(a, sortField).toLowerCase() : getField(a, sortField);
      const fieldValueB = typeof getField(b, sortField) === 'string' ? getField(b, sortField).toLowerCase() : getField(b, sortField);
  
      if (sortOrder === 'asc') {
        return fieldValueA && fieldValueB ? fieldValueA.localeCompare(fieldValueB) : 0;
      } else {
        return fieldValueA && fieldValueB ? fieldValueB.localeCompare(fieldValueA) : 0;
      }
    }
    return 0;
  });

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.login.uuid !== userId);
    const deletedUser = users.find(user => user.login.uuid === userId);
    setUsers(updatedUsers);
    setDeletedUsers(prevDeletedUsers => [...prevDeletedUsers, deletedUser]);
  };

  const restoreUsers = () => {
    setUsers(prevUsers => [...prevUsers, ...deletedUsers]);
    setDeletedUsers([]);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Lista de usuarios</h1>
          <p className="mt-2 text-sm text-gray-700">
            La información es obtenidad usando la API randomuser.me/api
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={toggleShadedRows}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Aplicar colores
          </button>
        </div>

        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => sortByField('location.country')}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ordenar por País
          </button>
        </div>

        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={restoreUsers}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Restaurar
          </button>
        </div>

      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th onClick={() => sortByField('name.first')} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    <a href='#' className="group inline-flex">
                      Nombre
                    </a>
                  </th>
                  <th onClick={() => sortByField('email')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href='#' className="group inline-flex">
                      Email
                    </a>
                  </th>
                  <th onClick={() => sortByField('location.country')} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href='#' className="group inline-flex">
                      País
                    </a>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedUsers.map((user, index) => (
                  <tr key={user.login.uuid} style={{ backgroundColor: shadedRows && index % 2 === 0 ? '#112233' : (shadedRows ? '#556677' : 'transparent') }}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-11 w-11 rounded-full" src={user.picture.thumbnail} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.name.first}</div>
                          <div className="mt-1 text-gray-500">{user.name.last}</div>
                        </div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>{user.email}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{user.location.country}</td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button onClick={() => deleteUser(user.login.uuid)} className="text-indigo-600 hover:text-indigo-900">
                        Delete<span className="sr-only">, {user.name.first}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
