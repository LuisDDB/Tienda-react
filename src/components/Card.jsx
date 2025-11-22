import { Button } from './Button';

export function Card({ source, altTxt, nameProduct, descriptionProdcut, stock , seller, category }) {
    return (
        <>
            <div className="bg-white shadow-lg border border-gray-200 
            rounded-xl overflow-hidden m-4 w-64 
            flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl">
                
                
                <div className="w-full overflow-hidden flex justify-center items-center bg-black">
                    <img 
                        src={source} 
                        alt={altTxt} 
                        className="object-cover w-full hover:opacity-90 transition-opacity" 
                    />
                </div>

                
                <div className="flex flex-col items-center p-4 text-center">
                    <h3 className="text-lg font-semibold text-black">{nameProduct}</h3>
                    <p className="text-gray-600 text-sm mb-3">{descriptionProdcut}</p>
                    <p>{stock}</p>
                    <p>{category}</p>
                    <p>{seller}</p>
                    
                    <Button 
                        txt="Comprar" 
                        styles="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors shadow-md"
                        url="/producto"
                    />
                </div>
            </div>
        </>
    )
}
