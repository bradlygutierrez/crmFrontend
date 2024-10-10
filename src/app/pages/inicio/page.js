import Image from "next/image";

import Link from "next/link";


export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenido a CRM</h1>
          <p className="text-gray-600 mb-8">Gestiona tus clientes, ventas y productos.</p>
          <Link href="/pages/clientes" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Ver clientes
          </Link>
        </div>
      </div>
    </div>
    
  );
}
