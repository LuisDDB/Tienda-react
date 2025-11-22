import { Card } from "../components/Card"

export function Home() {
    return (
        <>
            <main className="max-w-7xl mx-auto px-6 py-10">
                
                <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
                    Tienda React
                </h1>

                
                <section>
                    <h2 className="text-2xl font-semibold text-black mb-6 border-b-2 border-red-500 inline-block">
                        Productos
                    </h2>
                    
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Card 
                            source='https://picsum.photos/200' 
                            altTxt='foto chida' 
                            nameProduct='Camiseta' 
                            stock='80'
                            category='electronica'
                            seller='vendedor'
                            descriptionProdcuto='Te la puedes poner' 
                        />
                        <Card 
                            source='https://picsum.photos/200' 
                            altTxt='foto chida' 
                            nameProduct='Camiseta' 
                            descriptionProdcuto='Te la puedes poner' 
                            stock='80'
                            category='electronica'
                            seller='vendedor'
                        />
                        <Card 
                            source='https://picsum.photos/200' 
                            altTxt='foto chida' 
                            nameProduct='Camiseta' 
                            descriptionProdcuto='Te la puedes poner' 
                            stock='80'
                            category='electronica'
                            seller='vendedor'
                        />
                        <Card 
                            source='https://picsum.photos/200' 
                            altTxt='foto chida' 
                            nameProduct='Camiseta' 
                            descriptionProdcuto='Te la puedes poner' 
                            stock='80'
                            category='electronica'
                            seller='vendedor'

                        />
                        <Card 
                            source='https://picsum.photos/200' 
                            altTxt='foto chida' 
                            nameProduct='Camiseta' 
                            descriptionProdcuto='Te la puedes poner' 
                            stock='80'
                            category='electronica'
                            seller='vendedor'
                        />
                    </div>
                </section>
            </main>
        </>
    )
}
