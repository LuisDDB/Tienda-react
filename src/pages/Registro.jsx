import React, { useState } from "react";

const API_URL = "http://localhost:8000/api/registro.php";

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    rol_id: "1", // CLIENTE por defecto y fijo
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMensaje(data.mensaje || data.error || "Error desconocido");

      if (data.mensaje === "Usuario creado correctamente") {
        setForm({
          nombre: "",
          correo: "",
          contrasena: "",
          rol_id: "1",
        });
      }

    } catch (error) {
      console.error(error);
      setMensaje("No se pudo conectar con la API");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-lg p-6 rounded-xl"
      >
        <h2 className="text-xl font-bold text-center mb-4">Registro</h2>

        {mensaje && (
          <p className="text-center text-red-500 mb-4">{mensaje}</p>
        )}

        <label className="block font-semibold mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="w-full border rounded p-2 mb-4"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label className="block font-semibold mb-1">Correo</label>
        <input
          type="email"
          name="correo"
          className="w-full border rounded p-2 mb-4"
          value={form.correo}
          onChange={handleChange}
          required
        />

        <label className="block font-semibold mb-1">Contraseña</label>
        <input
          type="password"
          name="contrasena"
          className="w-full border rounded p-2 mb-4"
          value={form.contrasena}
          onChange={handleChange}
          required
        />

        {/* Rol fijo, oculto */}
        <input type="hidden" name="rol_id" value="1" />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
