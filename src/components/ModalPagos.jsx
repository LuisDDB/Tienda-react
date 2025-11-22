

// Este componente recibe el estado de visibilidad y una función para cerrarlo
export function ModalPagos({ isOpen, onClose }) {
  
  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    // 1. Fondo semi-transparente (el "overlay")
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" 
      onClick={onClose} // Cierra el modal al hacer clic fuera
    >
      
      {/* 2. El contenido del Modal (centrado) */}
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
      >
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-red-500">Métodos de Pago</h3>
          {/* Botón de cerrar */}
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 text-3xl font-light"
          >
            &times; 
          </button>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700">Aquí iría el contenido relacionado a los pagos.</p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Tarjeta de Crédito/Débito</li>
            <li>PayPal</li>
            <li>Transferencia Bancaria</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}