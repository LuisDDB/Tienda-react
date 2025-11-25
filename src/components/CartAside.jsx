import { useCart } from "../context/CartContext"; 

export function CartAside() {
    const { 
        isCartOpen, 
        toggleCart, 
        cartItems, 
        removeItem, 
        clearCart 
    } = useCart();

    const asideClasses = `
        fixed top-0 right-0 w-full md:w-96 h-full 
        bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
    `;

    const overlayClasses = `
        fixed top-0 left-0 w-full h-full bg-black z-40 transition-opacity duration-300
        ${isCartOpen ? 'opacity-75 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    `;

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <>
            <div 
                className={overlayClasses} 
                onClick={toggleCart}
            ></div>

            <aside className={asideClasses}>
                <div className="flex items-center justify-between p-4 border-b border-red-500">
                    <h2 className="text-2xl font-bold text-red-500">
                        Carrito
                    </h2>
                    
                    <button 
                        onClick={toggleCart}
                        className="text-gray-600 hover:text-red-500 transition-colors"
                        aria-label="Cerrar carrito"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-4 overflow-y-auto h-full pb-40">

                    {cartItems.length === 0 && (
                        <p className="text-gray-500">Parece que tu carrito esta vacio :(</p>
                    )}

                    {cartItems.map(item => (
                        <div 
                            key={item.id}
                            className="mt-4 p-3 border rounded-lg flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    Cantidad: {item.quantity}
                                </p>
                            </div>

                            <div className="flex flex-col items-end">
                                <p className="font-bold">
                                    ${ (item.price * item.quantity).toFixed(2) }
                                </p>

                                <button 
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 text-sm mt-1 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="absolute bottom-0 w-full bg-white border-t p-4 shadow-2xl">
                    <div className="flex justify-between font-bold text-lg mb-4">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    {cartItems.length > 0 && (
                        <button 
                            onClick={clearCart}
                            className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors font-semibold mb-3"
                        >
                            Vaciar Carrito
                        </button>
                    )}

                    <button className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors font-semibold">
                        Finalizar Compra
                    </button>
                </div>

            </aside>
        </>
    );
}
