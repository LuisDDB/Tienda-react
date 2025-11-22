
import { Button } from "../components/Button"; 

export function LogIn() {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario de login enviado!");
  
  };

  return (
 
    <div className="flex justify-center items-center min-h-screen bg-gray-100"> 
      
      {/* Tarjeta o Contenedor del Formulario (fondo oscuro) */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 text-white rounded-lg shadow-2xl">
        
        <h2 className="text-3xl font-bold text-center text-red-500">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Campo de Correo/Usuario */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="nombre@ejemplo.com"
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {/* Botón de Login  */}
          <div>
            <Button
              txt="Entrar" 
              type="submit" 
              styles="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              
            />
          </div>
        </form>

        {/* Enlace para registrarse  */}
        <div className="text-center text-sm">
          <p className="text-gray-400">
            ¿No tienes cuenta?{' '}
            {}
            <a href="#" className="font-medium text-red-500 hover:text-red-400">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}