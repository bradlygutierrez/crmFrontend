'use client'
import { useEffect, useState } from 'react';
export default function TableSkeleton() {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-semibold mb-6">Clientes</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left">ID</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Nombre</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {/* Generar varias filas para imitar la carga */}
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }