// /components/BarChartComponent.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(null); // Inicialmente sin mes seleccionado
    const [availableMonths, setAvailableMonths] = useState([]); // Estado para almacenar los meses con datos

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Llamada a la API PHP en el backend
                const response = await fetch('http://localhost:8000/pacientes-registros');
                const data = await response.json();

                // Filtrar los meses con datos
                const monthsWithData = data.map(item => item.month);
                setAvailableMonths(monthsWithData);

                // Establecer el mes actual o el primer mes con datos
                setCurrentMonth(new Date().getMonth() + 1);

                // Extraer los años, meses y el total de pacientes
                const labels = data.map(item => `${item.month}-${item.year}`);
                const totalPacientes = data.map(item => item.totalPacientes);

                // Crear un array de colores
                const barColors = data.map(item => item.month === currentMonth ? '#4CAF50' : '#E0E0E0'); // Verde para el mes actual, gris claro para los demás

                // Configuración de los datos para el gráfico
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Pacientes Registrados',
                            data: totalPacientes,
                            backgroundColor: barColors,
                            borderWidth: 0,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, [currentMonth]);

    if (!chartData) return <p>Cargando gráfico...</p>;

    return (
        <div className="w-full max-w-3xl mx-auto bg-[#FFFDF5] rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Pacientes por mes</h2>
                <select
                    className="text-sm text-gray-500 bg-gray-100 rounded px-2 py-1"
                    value={currentMonth || ""}
                    onChange={(e) => setCurrentMonth(Number(e.target.value))}
                >
                    {availableMonths.map((month, index) => (
                        <option key={index} value={month}>
                            {new Date(0, month - 1).toLocaleString('es-ES', { month: 'short' })}
                        </option>
                    ))}
                </select>
            </div>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false, // Ocultar leyenda
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => `${tooltipItem.raw}`,
                            },
                            backgroundColor: '#000', // Fondo negro para el tooltip
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            displayColors: false,
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#9E9E9E', // Color de las etiquetas en el eje x
                            },
                        },
                        y: {
                            beginAtZero: true,
                            display: false, // Ocultar el eje y
                        },
                    },
                }}
            />
        </div>
    );
};

export default BarChartComponent;
