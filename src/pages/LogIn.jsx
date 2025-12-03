import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Button } from "../components/Button"; // <-- COMENTADO para usar botón nativo

// URL de tu API de Login (Asegúrate de que el servidor PHP esté en el puerto 8000)
const API_URL = "http://localhost:8000/api/login.php"; 

export function LogIn() {
  // 1. ESTADO PARA LOS DATOS DEL FORMULARIO
  const [form, setForm] = useState({
    correo: "",
    contrasena: "", 
  });

  // 2. ESTADO PARA MENSAJES DE RESPUESTA
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  // MANEJADOR DE CAMBIOS: Actualiza el estado cuando el usuario escribe
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // MANEJADOR DE ENVÍO: Conexión con la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // --- PASO DE DIAGNÓSTICO ---
    console.log("-> Función handleSubmit iniciada. Intentando conectar a la API..."); 
    // ---------------------------
    
    setLoading(true);
    setMensaje(""); // Limpiar mensajes anteriores

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), 
      });

      const data = await res.json();
      
      if (res.ok) { // Código 200 (Login Exitoso)
        setMensaje(`¡Bienvenido, ${data.nombre}! Sesión iniciada.`);
        console.log("Datos del usuario:", data);
      } else {
        // 400 (Datos faltantes) o 401 (Credenciales inválidas)
        setMensaje(data.mensaje || "Error desconocido al iniciar sesión.");
      }

    } catch (error) {
      console.error("Error de conexión:", error);
      setMensaje("No se pudo conectar con el servidor de la API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"> 
      
      {/* Contenedor del formulario */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 text-white rounded-lg shadow-2xl">
        
        <h2 className="text-3xl font-bold text-center text-red-500">
          Iniciar Sesión
        </h2>

        {/* MENSAJE DE RESPUESTA */}
        {mensaje && (
          <p className={`text-center font-semibold ${
            mensaje.includes("exitoso") || mensaje.includes("Bienvenido") ? "text-green-500" : "text-red-500"
          }`}>
            {mensaje}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-300">
              Correo Electrónico
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="nombre@ejemplo.com"
              value={form.correo}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Ingresa tu contraseña"
              value={form.contrasena}
              onChange={handleChange}
            />
          </div>

          {/* Botón (HEMOS REEMPLAZADO EL COMPONENTE CUSTOM CON HTML NATIVO PARA LA PRUEBA) */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-800"
            >
              {loading ? "Cargando..." : "Entrar"}
            </button>
          </div>
          
        </form>

        {/* Link a Registro */}
        <div className="text-center text-sm">
          <p className="text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link 
              to="/registro" 
              className="font-medium text-red-500 hover:text-red-400"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}