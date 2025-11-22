import { SearchBar } from "./SearchrBar"
import { Button } from "./Button"
import { ModalPagos } from "./ModalPagos";
import React, { useState } from 'react'; // <-- NUEVA IMPORTACIÓN: Para el estado del modal

export function Navbar() {
    // NUEVO ESTADO: Controla si la ventana emergente está abierta o cerrada
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <>
            <header className="bg-black text-white shadow-md">
                <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    
                    
                    <div className="text-2xl font-bold text-red-500 cursor-pointer">
                        <p>logo</p>
                    </div>

                    
                    <div className="flex items-center space-x-2">
                        <SearchBar txtHolder="Buscar producto" />
                        <Button 
                            txt="Buscar" 
                            styles="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                            url="#"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button 
                            txt="LogIn" 
                            styles="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                            url="./login"
                        />
                        {/* NUEVO BOTÓN "Pagos": Usa un botón simple con el evento onClick */}
                        <button 
                            onClick={handleOpenModal} // <-- Llama a la función que abre el modal
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Pagos
                        </button>
                       
                        
                    </div>
                    

                    <div>
                        <p className="text-lg font-medium hover:text-red-500 cursor-pointer transition-colors">
                            carrito
                        </p>
                    </div>
                    
                </nav>
            </header>
            {/* NUEVO COMPONENTE MODAL: Renderizado fuera del header */}
            <ModalPagos 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
            />
        </>
    )
}
