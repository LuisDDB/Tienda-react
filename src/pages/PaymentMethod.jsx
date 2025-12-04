import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function PaymentForm() {
  const userId = localStorage.getItem("userId");
  const [method, setMethod] = useState("paypal");
  const { cartItems, clearCart } = useCart();
  const [sdkReady, setSdkReady] = useState(false);
  console.log(cartItems);


  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=ASoWpLQuioMTUWC_UqMlTh82RVrGU2NO2rqiFBB14zLMLXYrftdpeqmSWtbrUmdABo1QRNt_dcFWej0v&currency=MXN`;
    script.async = true;

    script.onload = () => setSdkReady(true);

    document.body.appendChild(script);
  }, []);

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
                  currency_code: "MXN",
                },
              },
            ],
          });
        },

        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("ORDER COMPLETADA:", order);

          const response = await fetch("http://localhost:8000/api/venta.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              roductos: cartItems.map(item => ({
                product_id: item.id,
                cantidad: item.quantity,
                precio_unitario: item.price
              })),
              paypal_order: order,
              total: total,
            }),
          });

          const result = await response.json();
          console.log("BACKEND RESP:", result);

          const responsePedido = await fetch("http://localhost:8000/api/pedidos.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({

      user_id: Number(userId),
      metodo_pago_id: 1,             

      productos: cartItems.map(item => ({
        product_id: item.id,
        cantidad: item.quantity,
        precio_unitario: item.price
      })),

      envio: {
        direccion: "sin dirección",  
        ciudad: "CDMX",
        estado_provincia: "CDMX",
        codigo_postal: "00000",
        telefono: "0000000000",
        costo_envio: 5.99
      },

      impuestos: total * 0.16,
      pago: {
        monto: total,
        estado: "exitoso",
        referencia: order.id
      }
    })
  });

    const text = await responsePedido.text();
    console.log("RESPUESTA RAW PEDIDO:", text);

    let resultPedido = null;
    try {
      resultPedido = JSON.parse(text);
      console.log("JSON PARSEADO:", resultPedido);
    } catch (error) {
      console.error("ERROR AL PARSEAR JSON:", error);
    }

    clearCart();

    window.location.href = "/pedido";
  },


    onError: (err) => {
      console.error("PayPal Error:", err);
      alert("Error en el pago.");
    },
      })
      .render("#paypal-btn-container");
  }, [sdkReady, method, total, cartItems, clearCart]);

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

        {/* Método Paypal */}
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

      </div>
    </div>
  </div>
);
}
