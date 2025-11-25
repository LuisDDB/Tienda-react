import { SearchBar } from "./SearchrBar";
import { Button } from "./Button";
import { useCart } from "../context/CartContext"; // Importar el hook

export function Navbar() {
    const { toggleCart } = useCart(); // Obtener la función para abrir/cerrar

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

                    
                    
                    <div>
                        {/* Agregar el onClick para abrir el carrito */}
                        <p 
                            className="text-lg font-medium hover:text-red-500 cursor-pointer transition-colors"
                            onClick={toggleCart} // Llama a la función al hacer clic
                        >
                            carrito
                        </p>
                    </div>
                </nav>
            </header>
        </>
    );
}