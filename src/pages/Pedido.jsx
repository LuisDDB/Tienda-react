import React from "react";

const Pedido = () => {
  // Datos de ejemplo (reemplaza con tu backend cuando quieras)
  const pedidos = [
    { id: 1, nombre: "Camiseta Medusa", cantidad: 2, precio: 20, estado: "Pendiente" },
    { id: 2, nombre: "Sudadera Azul",  cantidad: 1, precio: 45, estado: "Completado" },
    { id: 3, nombre: "Gorra Negra",     cantidad: 3, precio: 15, estado: "Cancelado" },
  ];

  // Función para formatear moneda (opcional)
  const formatoMoneda = (n) => `$${Number(n).toFixed(2)}`;

  // Total general del pedido (suma de totales por producto)
  const totalGeneral = pedidos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {/* Encabezado tipo tu sitio */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold text-red-500 mb-8">Pedido</h1>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">Productos en el pedido</h2>
            <p className="text-sm text-gray-500 mt-1">Revisa los productos, cantidades y el estado.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Producto</th>
                  <th className="py-3 px-4 text-left">Cantidad</th>
                  <th className="py-3 px-4 text-left">Precio unit.</th>
                  <th className="py-3 px-4 text-left">Precio total</th>
                  <th className="py-3 px-4 text-left">Estado</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {pedidos.map((p) => (
                  <tr key={p.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 text-sm text-gray-700">{p.id}</td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{p.nombre}</div>
                    </td>

                    <td className="py-4 px-4 text-gray-700">{p.cantidad}</td>

                    <td className="py-4 px-4 text-gray-700">{formatoMoneda(p.precio)}</td>

                    <td className="py-4 px-4 font-semibold">{formatoMoneda(p.precio * p.cantidad)}</td>

                    <td className="py-4 px-4">
                      <span
                        className={
                          "inline-block px-3 py-1 text-sm font-medium rounded-full " +
                          (p.estado === "Completado"
                            ? "bg-green-100 text-green-800"
                            : p.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800")
                        }
                      >
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Productos: <span className="font-medium text-gray-800">{pedidos.length}</span></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
