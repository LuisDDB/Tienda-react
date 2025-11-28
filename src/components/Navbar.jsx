import { useCart } from "../context/CartContext"; 
import { Link } from "react-router";
import logo2 from "../assets/logo2.png";

export function Navbar() {
    const { toggleCart } = useCart(); 

    return (
        <>
            <header className="bg-black text-white shadow-md">
                <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

                    <Link 
                    to="/"
                    className="ext-2xl font-bold text-red-500 cursor-pointer"
                    >
                        <img className="h-12 w-auto object-contain" src={logo2} alt="logo" />
                    </Link>

                    <div className="text-2xl font-bold text-red-500 cursor-pointer">
                        <img src="" alt="" />
                    </div>

                    <div
                        className=" hover:text-red-500 cursor-pointer transition-colors"
                        onClick={toggleCart} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" /></svg>
                    </div>
                </nav>
            </header>
        </>
    );
}