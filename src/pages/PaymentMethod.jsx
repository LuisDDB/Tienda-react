import { useState } from "react";

import { useCart } from "../context/CartContext";

export default function PaymentForm() {

  const [method, setMethod] = useState("card");
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Pagar</h2>

          <label className="block font-semibold mb-1">País</label>
          <select className="w-full border rounded-lg px-3 py-2 mb-6">
            <option>México</option>
          </select>

          <h3 className="font-bold text-lg mb-2">Método de pago</h3>

          <button
            onClick={() => setMethod("tienda")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border mb-3
                        ${method === "tienda" ? "border-red-600" : "border-gray-300"}`}
          >
            <input type="radio" checked={method === "tienda"} readOnly />
            <span className="font-semibold">Pago en tienda</span>
          </button>

          {
            method === "tienda" && (
              <div className="mt-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Al seleccionar esta opción se te generará un código de barras que podrás llevar a tu
                  sucursal más cercana para realizar el pago.
                  <br /><br />
                  <span className="font-semibold text-red-600">
                    Importante:
                  </span>{" "}
                  el código tendrá una vigencia de <strong>3 días</strong>. Después de ese tiempo
                  será inválido y deberás generar uno nuevo.
                </p>
              </div>
            )
          }


          <button
            onClick={() => setMethod("card")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border mb-4
                        ${method === "card" ? "border-red-600" : "border-gray-300"}`}
          >
            <input type="radio" checked={method === "card"} readOnly />
            <span className="font-semibold">Tarjeta</span>
          </button>

          {method === "card" && (
            <div className="space-y-4">

              <div>
                <label className="block font-semibold mb-1">Número de tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Fecha de vencimiento</label>
                  <input placeholder="MM/AA" className="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label className="block font-semibold mb-1">CVC/CVV</label>
                  <input placeholder="123" className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Nombre en la tarjeta</label>
                  <input placeholder="Juan Pérez" className="w-full border rounded-lg px-3 py-2" />
                </div>

                <div>
                  <label className="block font-semibold mb-1">CURP</label>
                  <input placeholder="CURP" className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Guardar esta tarjeta</span>
              </label>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border h-fit">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Resumen del pedido
          </h2>

          <div className="space-y-3 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="font-medium">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            {cartItems.length === 0 && (
              <p className="text-gray-500">No hay productos en el carrito.</p>
            )}
          </div>

          <p className="text-xl font-bold mb-6">
            Total: <span className="text-red-600">${total.toFixed(2)}</span>
          </p>

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-lg shadow-md"
            disabled={cartItems.length === 0}
          >
            {method === "tienda" ? "Descargar factura" : 
            `Pagar $${total.toFixed(2)}`}
          </button>

        </div>
      </div>
    </div>
  );
}
