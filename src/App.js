import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [shadedRows, setShadedRows] = useState(false);
  const [sortOrderByCountry, setSortOrderByCountry] = useState('asc');

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

  const toggleSortOrderByCountry = () => {
    setSortOrderByCountry(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrderByCountry === 'asc') {
      return a.location.country.localeCompare(b.location.country);
    } else {
      return b.location.country.localeCompare(a.location.country);
    }
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Lista de usuarios</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
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
            onClick={toggleSortOrderByCountry}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Ordenar por País
          </button>
        </div>

      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombre</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Género</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Teléfono</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ciudad</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">País</th>
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
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{user.gender}</div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>{user.email}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{user.phone}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{user.location.city}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{user.location.country}</td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Delete<span className="sr-only">, {user.name.first}</span>
                      </a>
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
