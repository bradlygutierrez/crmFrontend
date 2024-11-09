import Link from "next/link";
import React from "react";
import DashBoardItem from "./dashboardItem";
import CerrarSesionButton from "./cerrarSessionButton";
import UsuarioInfo from "./UsuarioInfo";

export default function Sidebar() {
    return (
        <aside className="flex flex-col w-65 h-full px-5 py-6 pb-10 overflow-y-auto bg-white border-r">
            <a href="#" className="w-full flex align-middle justify-center">
                <img className="w-auto h-[7rem]" src="/clinmed.jfif" alt="Logo" />
            </a>

            <UsuarioInfo>
                
            </UsuarioInfo>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6">
                    {/* Analytics Section */}
                    <div className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase">Analytics</label>
                        <DashBoardItem nombre = "Estadísticas" url="#" icon="/stats.gif" />
                        <DashBoardItem nombre = "Formularios de satisfaccion" url="/pages/formularios" icon="/survey.gif" />
                    </div>

                    {/* Tickets*/}
                    <div className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase"> Tickets</label>
                        <DashBoardItem nombre = "Tickets" url="/pages/tickets" icon="/ticket.gif" />

                    </div>

                    {/* Content Section */}
                    <div className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase">Content</label>
                        <DashBoardItem nombre = "Pacientes" url="/pages/pacientes" icon="/costumers.gif" />
                        <DashBoardItem nombre = "Servicios" url="/pages/servicios" icon="/services.gif" />
                        <DashBoardItem nombre = "Citas" url="/pages/citas" icon="/appointment.gif" />
                        <DashBoardItem nombre = "Interacciones" url="/pages/interacciones" icon="/interaction.gif" />
                        <DashBoardItem nombre = "Empresas" url="/pages/empresas" icon="/enterprise-architecture.gif" />
                        <DashBoardItem nombre = "Contactos" url="/pages/contactos" icon="/contacts.gif" />
                    </div>

                </nav>

                <CerrarSesionButton></CerrarSesionButton>

            </div>
        </aside>
    );
}
