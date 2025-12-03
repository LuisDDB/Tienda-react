import React, { useEffect, useState } from "react";

// URL de la API de pedidos
const API_URL = "http://localhost:8000/api/pedidoEstado.php";

const Pedido = () => {
    // ------------------------------------
    // Estado
    // ------------------------------------
    // Solo necesitamos el estado de carga/error y el estado del pedido.
    const [estado, setEstado] = useState(null); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    // ID de la orden que queremos consultar (esto debería venir de la URL o del estado de la aplicación)
    // Usamos '1' como ejemplo fijo.
    const orderId = 1; 

    // ------------------------------------
    // Lógica de Carga de Datos
    // ------------------------------------
    const cargarDatos = async () => {
        try {
            // FIX: La URL de fetch apunta directamente a la API de pedido con el ID como parámetro GET.
            const res = await fetch(`${API_URL}?id=${orderId}`);

            // 404 de la API (Pedido no encontrado)
            if (!res.ok) {
                setError(true);
                setCargando(false);
                return;
            }

            const data = await res.json();

            // Si la API devuelve un mensaje de error o los datos están vacíos
            if (!data || data.mensaje || !data.order_id) { 
                setError(true);
                setCargando(false);
                return;
            }
            
            // FIX: Extraemos el 'estado' directamente del objeto 'data'
            setEstado(data.estado);
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

    // ------------------------------------
    // Renderizado Condicional
    // ------------------------------------

    // 1. Mensaje de Carga
    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-xl font-semibold text-blue-600">
                    Cargando estado del pedido...
                </p>
            </div>
        );
    }

    // 2. Mensaje de Error
    if (error || estado === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50"> 
                <p className="text-2xl font-bold text-red-600 p-8 bg-white rounded-xl shadow-lg">
                    ⚠️ Error: Pedido #{orderId} no encontrado o sin datos.
                </p>
            </div>
        );
    }

    // 3. Contenido Principal: SOLO MUESTRA EL ESTADO (Según tu solicitud)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
                
                <h1 className="text-4xl font-extrabold text-gray-800">
                    Tu Pedido #{orderId}
                </h1>
                
                {/* ESTADO DESTACADO */}
                <div className="p-5 rounded-lg border-4 border-yellow-400 bg-yellow-50 shadow-inner">
                    <p className="text-lg font-medium text-gray-600 mb-1">
                        ESTADO ACTUAL
                    </p>
                    <h2 className="text-5xl font-black uppercase text-yellow-700">
                        {estado}
                    </h2>
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                    Para ver el detalle de los productos, usa otra ruta o añade un botón "Ver detalles".
                </p>
            </div>
        </div>
    );
};

export default Pedido;