// /components/PieChartComponent.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Tooltip, Legend, Chart as ChartJS } from 'chart.js';

// Registrar los elementos necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [porcentajeConCita, setPorcentajeConCita] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/pacientes-citas');
                const data = await response.json();

                const totalPacientes = data.totalPacientes;
                const pacientesConCitaMes = data.pacientesConCitaMes;
                const pacientesSinCitaMes = data.pacientesSinCitaMes;

                const porcentaje = (pacientesConCitaMes / totalPacientes) * 100;

                // Configuración de los datos para el gráfico
                setChartData({
                    labels: ['Pacientes con cita', 'Pacientes sin cita'],
                    datasets: [
                        {
                            data: [pacientesConCitaMes, pacientesSinCitaMes],
                            backgroundColor: ['#4CAF50', '#E0E0E0'], // verde para con cita, gris claro para sin cita
                            borderWidth: 0,
                        },
                    ],
                });
                setPorcentajeConCita(porcentaje);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    if (!chartData) return <p>Cargando gráfico...</p>;

    return (
        <div className="w-full max-w-xs mx-auto bg-[#EDFDFF] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Citas</h2>
            <p className="text-sm text-gray-500 mb-4">Pacientes que agendan cita</p>
            <div className="relative w-full max-w-xs mx-auto">
                <Pie 
                    data={chartData} 
                    options={{
                        plugins: {
                            legend: {
                                display: false, // Ocultar leyenda
                            },
                            tooltip: {
                                enabled: false, // Desactivar el tooltip
                            },
                        },
                        cutout: '70%', // Ajuste para mostrar el centro vacío
                    }} 
                />
                {/* Texto en el centro del gráfico */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-500 text-2xl font-bold">{Math.round(porcentajeConCita)}%</p>
                        <p className="text-sm text-gray-500">Total de citas por paciente</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PieChartComponent;
