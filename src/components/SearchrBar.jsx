export function SearchBar({ txtHolder }) {
    return (
        <>
            <input 
                type="text" 
                placeholder={txtHolder}
                className="w-64 px-4 py-2 rounded-md border-2 border-red-500 
                           focus:outline-none focus:ring-2 focus:ring-red-500 
                           text-black placeholder-gray-400 shadow-sm transition-all"
            />
        </>
    )
}
