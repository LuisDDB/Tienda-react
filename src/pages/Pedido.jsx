import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api/pedidos.php";

export default function Pedido() {
  const userId = localStorage.getItem("userId");

  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // Para expandir/colapsar una fila
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const cargarPedidos = async () => {
    try {
      const res = await fetch(`${API_URL}?user_id=${userId}`);

      if (!res.ok) {
        setError(true);
        setCargando(false);
        return;
      }

      const data = await res.json();

      if (!data || data.length === 0) {
        setError(true);
        setCargando(false);
        return;
      }

      setPedidos(data);
      setCargando(false);
    } catch (err) {
      console.error("Error:", err);
      setError(true);
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl font-semibold text-blue-600">
          Cargando pedidos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-600 font-bold bg-white p-6 rounded-lg shadow-xl">
          No hay pedidos para el usuario #{userId}
        </p>
      </div>
    );
  }

  // ------------------------------------
  // RENDER
  // ------------------------------------
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Tus Pedidos
        </h1>

        {/* Tabla */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 font-semibold">Número de Pedido</th>
              <th className="p-3 font-semibold">Estado</th>
              <th className="p-3 font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((p) => (
              <React.Fragment key={p.order_id}>
                {/* FILA PRINCIPAL */}
                <tr className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">{p.numero_pedido}</td>
                  <td className="p-3 uppercase font-bold text-yellow-700">
                    {p.estado}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        setPedidoSeleccionado(
                          pedidoSeleccionado === p.order_id ? null : p.order_id
                        )
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {pedidoSeleccionado === p.order_id
                        ? "Cerrar"
                        : "Ver detalles"}
                    </button>
                  </td>
                </tr>

                {/* FILA EXPANDIDA (detalles) */}
                {pedidoSeleccionado === p.order_id && (
                  <tr className="bg-gray-50 border-b">
                    <td colSpan="3" className="p-4">
                      <div className="grid grid-cols-2 gap-4 text-gray-700">

                        <p><strong>Subtotal:</strong> ${p.subtotal}</p>
                        <p><strong>Impuestos:</strong> ${p.impuestos}</p>

                        <p><strong>Costo de envío:</strong> ${p.costo_envio}</p>
                        <p><strong>Total:</strong> ${p.total}</p>

                        <p><strong>Método de pago:</strong> {p.metodo_pago_id}</p>
                        <p><strong>Fecha pedido:</strong> {p.fecha_pedido}</p>

                        <p><strong>ID pedido:</strong> {p.order_id}</p>
                        <p><strong>ID usuario:</strong> {p.user_id}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
