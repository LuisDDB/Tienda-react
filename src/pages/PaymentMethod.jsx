import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("");

  const handleContinue = () => {
    if (!method) return alert("Selecciona un método de pago");
    navigate("/checkout/confirm", { state: { paymentMethod: method } });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Elige tu método de pago</h1>

      <div className="space-y-4">

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            value="tarjeta"
            onChange={(e) => setMethod(e.target.value)}
          />
          Tarjeta de crédito / débito
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            value="efectivo"
            onChange={(e) => setMethod(e.target.value)}
          />
          Pago en efectivo en tienda
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            value="transferencia"
            onChange={(e) => setMethod(e.target.value)}
          />
          Transferencia bancaria
        </label>

      </div>

      <button
        onClick={handleContinue}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
      >
        Continuar
      </button>
    </div>
  );
}
