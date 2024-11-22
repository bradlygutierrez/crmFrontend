import React from 'react';

const DataDisplayTickets = ({ title, data, onRowClick, onChangeStatus }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    className="px-4 py-2 border-b text-left text-sm text-gray-600"
                  >
                    {key}
                  </th>
                ))}
              <th className="px-4 py-2 border-b text-left text-sm text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length >= 0 ? data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick(item)}
              >
                {Object.keys(item).map((key, i) => (
                  <td
                    key={i}
                    className={`px-4 py-2 border-b text-sm ${key === 'estado'
                        ? item[key] === 'Solucionado'
                          ? 'text-green-500 font-semibold' // Verde si es "Solucionado"
                          : 'text-red-500 font-semibold'   // Rojo si es "Pendiente"
                        : 'text-gray-700'
                      }`}
                  >
                    {item[key]}
                  </td>
                ))}
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que se seleccione la fila al hacer clic en el botón
                      onChangeStatus(item.id_ticket);
                      console.log(item.id_ticket); // Llamar a la función de cambiar estado con el ID
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Cambiar Estado
                  </button>
                </td>
              </tr>
            )): <p> No data available</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataDisplayTickets;
