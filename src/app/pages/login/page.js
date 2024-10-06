import React from "react";
export default function LoginPage() {
    return (
      <div className="flex h-screen items-center">
        {/* Sección izquierda */}
        <div className="w-1/2 bg-blue-600 flex flex-col justify-between items-center h-full">
          <div className="flex flex-col justify-center w-full p-8">
            <h1 className="text-white text-4xl font-bold mb-8 text-center p-12 ">
              Bienvenido a G&B CRM!
            </h1>
          </div>
          <div className="flex-grow flex justify-center items-center w-full">
            <div className="bg-gray-300 h-40 w-64"></div> {/* Cuadro gris */}
          </div>
        </div>
  
        {/* Sección derecha */}
        <div className="w-1/2 flex justify-center items-center min-h-screen">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Correo electrónico"
              />
            </div>
  
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
  
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Login
              </button>
            </div>
  
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <a href="#" className="text-blue-600">
                  Regístrate aquí
                </a>
              </p>
              <p className="text-sm text-gray-600">
                ¿Has olvidado tu contraseña?{" "}
                <a href="#" className="text-blue-600">
                  Olvidé mi contraseña
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // Evita el layout predeterminado
  LoginPage.getLayout = function PageLayout(page) {
    return page;
  };
  