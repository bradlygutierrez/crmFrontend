import React, { useState, useEffect } from "react";
import DashBoardItem from "./dashboardItem";
import CerrarSesionButton from "./cerrarSessionButton";
import UsuarioInfo from "./UsuarioInfo";

export default function Sidebar() {
    const [usuario, setUsuario] = useState(null);

    // Función para obtener el usuario logeado
    const obtenerUsuarioLogeado = async () => {
        try {
            const response = await fetch('http://localhost:8000/usuario-logeado', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            if (data) {
                setUsuario(data);
            }
        } catch (error) {
            console.error('Error al obtener el usuario logeado:', error);
        }
    };

    useEffect(() => {
        obtenerUsuarioLogeado();
    }, []);

    // Mostrar mensaje de carga mientras se obtiene el usuario
    if (!usuario) {
        return <p>Cargando usuario...</p>;
    }

    // Definir los módulos según el rol
    const menuItems = {
        Analista: ["Estadísticas", "Interacciones", "Pacientes", "Empresas", "Contactos"],
        Doctor: ["Citas", "Pacientes", "Interacciones"],
        Soporte: ["Estadísticas", "Interacciones", "Pacientes", "Empresas", "Contactos", "Citas", "Tickets", "Servicios"],
        Paciente: ["Citas", "Tickets", "Formularios de satisfaccion"], // Paciente tendrá rutas diferentes
        Propietario: ["Estadísticas", "Interacciones", "Pacientes", "Empresas", "Contactos", "Citas", "Tickets", "Servicios"]
    };

    // Obtener el rol del usuario
    const rol = usuario.usuario.rol; // Aquí accedemos al rol del usuario
    const userMenuItems = menuItems[rol] || []; // Si el rol no coincide, mostrar un menú vacío

    return (
        <aside className="flex flex-col w-65 h-full px-5 py-6 pb-10 overflow-y-auto bg-white border-r">
            <a href="#" className="w-full flex align-middle justify-center">
                <img className="w-auto h-[7rem]" src="/clinmed.jfif" alt="Logo" />
            </a>

            <UsuarioInfo />

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6">
                    {/* Mostrar módulos según el rol */}
                    {userMenuItems.includes("Estadísticas") && (
                        <div className="space-y-3">
                            <label className="px-3 text-xs text-gray-500 uppercase">Analytics</label>
                            <DashBoardItem nombre="Estadísticas" url="/pages/dashboard" icon="/stats.gif" />
                            <DashBoardItem nombre="Formularios de satisfaccion" url="/pages/formularios" icon="/survey.gif" />
                        </div>
                    )}

                    {/* Mostrar "Formulario de Satisfacción" solo para Pacientes */}
                    {userMenuItems.includes("Formularios de satisfaccion") && (
                        <div className="space-y-3">
                            <label className="px-3 text-xs text-gray-500 uppercase">Formulario</label>
                            <DashBoardItem nombre="Formulario de Satisfacción" url="/pages/crearFormulario" icon="/survey.gif" />
                        </div>
                    )}

                    {/* Tickets - Verifica si el usuario es Paciente */}
                    {userMenuItems.includes("Tickets") && (
                        <div className="space-y-3">
                            <label className="px-3 text-xs text-gray-500 uppercase"> Tickets</label>
                            {rol === "Paciente" ? (
                                <DashBoardItem nombre="Tickets" url="/pages/ticketPaciente" icon="/ticket.gif" />
                            ) : (
                                <DashBoardItem nombre="Tickets" url="/pages/tickets" icon="/ticket.gif" />
                            )}
                        </div>
                    )}

                    {/* Content Section */}
                    {userMenuItems.some(item => ["Pacientes", "Citas", "Interacciones", "Empresas", "Contactos"].includes(item)) && (
                        <div className="space-y-3">
                            <label className="px-3 text-xs text-gray-500 uppercase">Content</label>
                            {userMenuItems.includes("Pacientes") && (
                                <DashBoardItem nombre="Pacientes" url="/pages/pacientes" icon="/costumers.gif" />
                            )}
                            {userMenuItems.includes("Citas") && (
                                rol === "Paciente" ? (
                                    <DashBoardItem nombre="Citas" url="/pages/citaPaciente" icon="/appointment.gif" />
                                ) : (
                                    <DashBoardItem nombre="Citas" url="/pages/citas" icon="/appointment.gif" />
                                )
                            )}
                            {userMenuItems.includes("Interacciones") && (
                                <DashBoardItem nombre="Interacciones" url="/pages/interacciones" icon="/interaction.gif" />
                            )}
                            {userMenuItems.includes("Empresas") && (
                                <DashBoardItem nombre="Empresas" url="/pages/empresas" icon="/enterprise-architecture.gif" />
                            )}
                            {/* Servicios - Agregar este ítem */}
                            {userMenuItems.includes("Servicios") && (
                                <div className="space-y-3">
                                    <DashBoardItem nombre="Servicios" url="/pages/servicios" icon="/services.gif" />
                                </div>
                            )}
                            {userMenuItems.includes("Contactos") && (
                                <DashBoardItem nombre="Contactos" url="/pages/contactos" icon="/contacts.gif" />
                            )}
                        </div>
                    )}
                </nav>

                <CerrarSesionButton />
            </div>
        </aside>
    );
}
