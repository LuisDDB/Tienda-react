import React, { useEffect, useState } from "react";

// Asegúrate de que API_URL se importa correctamente desde tu archivo config
const API_URL = "http://localhost:8000/api/registro.php";

const Pedido = () => {
  const [items, setItems] = useState([]);
  const [estado, setEstado] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // ID de la orden: el valor de '10' es el que se usa actualmente
  const orderId = 1; 

  const cargarDatos = async () => {
    try {
      // Usando backticks (`) para la plantilla de cadena en fetch
      const res = await fetch(`${API_URL}/pedido-items.php?order_id=${orderId}`);

      // Si la API no responde correctamente
      if (!res.ok) {
        setError(true);
        setCargando(false);
        return;
      }

      const data = await res.json();

      // Si la API no envía items o está vacío
      if (!data || !data.items || data.items.length === 0) {
        setError(true);
        setCargando(false);
        return;
      }

      setItems(data.items);
      setEstado(data.estado || "Sin estado");
      setCargando(false);
      
    } catch (error) {
      console.error("Error cargando datos:", error);
      setError(true);
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // 1. Mensaje de Carga
  if (cargando) {
    // Texto simple envuelto en un div
    return <div className="p-4 text-center">Cargando datos...</div>;
  }

  // 2. Mensaje de Error (con estilos de centrado y resaltado de Tailwind CSS)
  if (error) {
    return (
      // Contenedor para centrar el contenido vertical y horizontalmente en toda la pantalla
      <div className="flex items-center justify-center min-h-screen"> 
        {/* Estilos para el texto: text-4xl (grande), font-bold (resaltado) y text-black */}
        <p className="text-4xl font-bold text-black">
          No hay pedidos pendientes
        </p>
      </div>
    );
  }

  // 3. Contenido Principal del Pedido
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Pedido #{orderId}</h1> 
      <h2 className="text-lg font-semibold mb-2">Estado: {estado}</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Producto</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Precio Unit.</th>
            <th className="border p-2">Descuento</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.order_item_id}>
              <td className="border p-2">{item.producto}</td>
              <td className="border p-2 text-center">{item.cantidad}</td>
              <td className="border p-2 text-center">${item.precio_unitario}</td>
              <td className="border p-2 text-center">${item.descuento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedido;