import Link from "next/link";
import React from "react";
import DashBoardItem from "./dashboardItem";

export default function Sidebar() {
    return (
        <aside className="flex flex-col w-64 h-full px-5 py-8 overflow-y-auto bg-white border-r">
            <a href="#">
                <img className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="Logo" />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6">
                    {/* Analytics Section */}
                    <div className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase">Analytics</label>
                        <DashBoardItem nombre = "Estadísticas" url="#" icon="/stats.gif" />
                    </div>
                    {/* Content Section */}
                    <div className="space-y-3">
                        <label className="px-3 text-xs text-gray-500 uppercase">Content</label>
                        <DashBoardItem nombre = "Clientes" url="/pages/clientes" icon="/costumers.gif" />
                        <DashBoardItem nombre = "Productos" url="/pages/productos" icon="/products.gif" />
                        <DashBoardItem nombre = "Ventas" url="/pages/ventas" icon="/sale.gif" />
                        <DashBoardItem nombre = "Interacciones" url="/pages/interacciones" icon="/interaction.gif" />


                    </div>
                </nav>
            </div>
        </aside>
    );
}
