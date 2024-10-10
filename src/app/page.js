'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Cambiado a next/navigation

export default function LoginPage() {
  const router = useRouter(); // Ahora se importa de next/navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_usuario: email,
          contraseña: password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.message === "Login exitoso") {
        console.log("Usuario autenticado:", data.user);
        // Redirige a la página de inicio
        router.push("/pages/inicio");
      } else {
        setError(data.message || "Error en el login.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center">
      {/* Sección izquierda */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-between items-center h-full">
        <div className="flex flex-col justify-center w-full p-8">
          <h1 className="text-white text-4xl font-bold mb-8 text-center p-12">
            ¡Bienvenido a G&B CRM!
          </h1>
        </div>
        <div className="flex-grow flex justify-center items-center w-full">
          <div className="bg-gray-300 h-40 w-64"></div> {/* Cuadro gris */}
        </div>
      </div>

      {/* Sección derecha */}
      <div className="w-1/2 flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contraseña"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="contraseña"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs italic mb-4">{error}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Login"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link href="/pages/registro" className="text-blue-600">
                Regístrate aquí
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              ¿Has olvidado tu contraseña?{" "}
              <Link href="#" className="text-blue-600">
                Olvidé mi contraseña
              </Link>
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
