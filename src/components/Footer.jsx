export function Footer() {
    return (
        <>
            <footer className="bg-black text-white py-6 mt-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    
                    
                    <p className="text-center text-sm md:text-base">
                        Todos los derechos reservados para{" "}
                        <b className="text-red-500">
                            <i>@Ratas</i>
                        </b>
                    </p>

                    
                    <div className="flex space-x-4 mt-3 md:mt-0">
                        <a href="#" className="hover:text-red-500 transition-colors text-sm">Privacidad</a>
                        <a href="#" className="hover:text-red-500 transition-colors text-sm">Términos</a>
                        <a href="#" className="hover:text-red-500 transition-colors text-sm">Contacto</a>
                    </div>
                </div>
            </footer>
        </>
    )
}
