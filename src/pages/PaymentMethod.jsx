import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function PaymentForm() {

  const [method, setMethod] = useState("paypal");
  const { cartItems } = useCart();

  const [sdkReady, setSdkReady] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // === 1. Cargar SDK de PayPal ===
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=ASoWpLQuioMTUWC_UqMlTh82RVrGU2NO2rqiFBB14zLMLXYrftdpeqmSWtbrUmdABo1QRNt_dcFWej0v&currency=MXN`;
    script.async = true;

    script.onload = () => {
      console.log("PayPal SDK cargado");
      setSdkReady(true);
    };

    document.body.appendChild(script);
  }, []);

  // === 2. Renderizar botones PayPal ===
  useEffect(() => {
    if (!sdkReady || method !== "paypal") return;
    if (!window.paypal) return;

    const container = document.getElementById("paypal-btn-container");
    if (!container) return;

    container.innerHTML = "";

    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { 
                  value: total.toFixed(2),
                  currency_code: "MXN"
                },
              },
            ],
          });
        },

        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("ORDER COMPLETADA:", order);

          const product = cartItems[0];

          const response = await fetch("http://localhost/api/venta.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product_id: product.id,
              cantidad: product.quantity,
              paypal_order: order,
            }),
          });

          const result = await response.json();
          console.log("BACKEND RESP:", result);

          alert(result.mensaje || "Pago completado correctamente");
        },

        onError: (err) => {
          console.error("PayPal Error:", err);
          alert("Ocurrió un error con PayPal");
        },
      })
      .render("#paypal-btn-container");
  }, [sdkReady, method, total, cartItems]);

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* === PAGO === */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Pagar</h2>

          <label className="block font-semibold mb-1">País</label>
          <select className="w-full border rounded-lg px-3 py-2 mb-6">
            <option>México</option>
          </select>

          <h3 className="font-bold text-lg mb-2">Método de pago</h3>

          {/* Método tienda */}
          <button
            onClick={() => setMethod("tienda")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border mb-3
                        ${method === "tienda" ? "border-red-600" : "border-gray-300"}`}
          >
            <input type="radio" checked={method === "tienda"} readOnly />
            <span className="font-semibold">Pago en tienda</span>
          </button>

          {method === "tienda" && (
            <div className="mt-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-gray-700">
                Se generará un código de barras válido por 3 días.
              </p>
            </div>
          )}

          {/* Método PayPal */}
          <button
            onClick={() => setMethod("paypal")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border mb-4
                        ${method === "paypal" ? "border-red-600" : "border-gray-300"}`}
          >
            <input type="radio" checked={method === "paypal"} readOnly />
            <span className="font-semibold">PayPal</span>
          </button>

          {method === "paypal" && (
            <div className="mt-6">
              {!sdkReady ? (
                <p>Cargando PayPal...</p>
              ) : (
                <div id="paypal-btn-container"></div>
              )}
            </div>
          )}
        </div>

        {/* === RESUMEN === */}
        <div className="bg-white p-6 rounded-2xl shadow-md border h-fit">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Resumen del pedido
          </h2>

          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
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

          {method === "tienda" && (
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-lg shadow-md"
              disabled={cartItems.length === 0}
            >
              Descargar factura
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
