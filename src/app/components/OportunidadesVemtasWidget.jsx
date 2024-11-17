import React, { useEffect, useState } from 'react';

const OportunidadesVentasWidget = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener los pacientes pendientes
    const fetchPacientesPendientes = async () => {
      try {
        const response = await fetch('http://localhost:8000/pacientes/chequeos-pendientes'); // Ajusta la ruta según tu configuración
        const data = await response.json();

        if (data.message) {
          setPacientes([]);
        } else {
          setPacientes(data);
        }
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };

    fetchPacientesPendientes();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">
        Oportunidades de ventas (pacientes con chequeos pendientes)
      </h3>
      {pacientes.length > 0 ? (
        <ul>
          {pacientes.map((paciente, index) => (
            <li key={index}>
              Paciente: <strong>{paciente.nombre_paciente}</strong>, última cita:{' '}
              <strong>
                {paciente.ultima_cita
                  ? `${paciente.dias_desde_ultima_cita} día(s) desde la última cita`
                  : 'No registrada'}
              </strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay pacientes con chequeos pendientes.</p>
      )}
    </div>
  );
};

export default OportunidadesVentasWidget;
