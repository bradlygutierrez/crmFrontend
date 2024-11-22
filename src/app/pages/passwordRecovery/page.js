'use client';
import React, { useState } from "react";

export default function RecuperarContraseña() {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    const manejarCambio = (e) => {
        setEmail(e.target.value);
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        // Validar que el correo no esté vacío y tenga un formato correcto
        if (!email) {
            setMensaje("Por favor, ingresa un correo electrónico.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setMensaje("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        setLoading(true);  // Mostrar el estado de carga

        // Hacer la solicitud al backend para recuperar la contraseña
        try {
            const response = await fetch("http://localhost:8000/recuperar-contrasena", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Error en el servidor");
            }

            const data = await response.json();

            if (data.success) {
                setMensaje("Se ha enviado un correo con las instrucciones.");
            } else {
                setMensaje(data.message || "Hubo un error al enviar el correo.");
            }
        } catch (error) {
            console.log("Error en la solicitud:", error); // Log para ver el error
            <div>
                {error}
            </div>
            setMensaje("Error al intentar recuperar la contraseña.");
        } finally {
            setLoading(false);  // Detener el estado de carga
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Recuperar Contraseña</h2>
                <form onSubmit={manejarEnvio}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={manejarCambio}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Ingresa tu correo"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar instrucciones"}
                    </button>
                </form>
                {mensaje && <p className={`mt-4 text-center ${mensaje.includes("error") ? 'text-red-500' : 'text-green-500'}`} aria-live="polite">{mensaje}</p>}
            </div>
        </div>
    );
}
