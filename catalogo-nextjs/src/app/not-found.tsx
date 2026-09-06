import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-2">404 - No Encontrado</h1>
      <p className="text-gray-600 mb-4">El videojuego o recurso solicitado no existe.</p>
      <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded">
        Regresar al Inicio
      </Link>
    </div>
  );
}