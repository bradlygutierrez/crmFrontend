
import Image from "next/image";

export default function RecuperarContraseña() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
            {/* Icono de recuperación de contraseña */}
            <div className="mb-4">
              {/* Icono de recuperación de contraseña */}
                <div className="mb-4">
                <Image
                    src="/recuperacion-de-cuenta.png" // Ruta del archivo PNG
                    alt="Recuperar contraseña"
                    width={64} // Ajusta el tamaño según sea necesario
                    height={64}
                    className="mx-auto"
                />
                </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-700">Recuperar Contraseña</h1>
            <p className="mt-4 text-gray-600">
              Para recuperar la contraseña, contacte a soporte:
            </p>
            <p className="mt-2 text-blue-600 font-medium">e.barrera@fia.unicit.edu.ni</p>
            <p className="mt-2 text-blue-600 font-medium">b.gutierrezc@fia.unicit.edu.ni</p>
          </div>
        </div>
      );
}
RecuperarContraseña.getLayout = function PageLayout(page) {
    return page;
  };