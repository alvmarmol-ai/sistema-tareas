import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Para obtener datos frescos siempre

export default async function HomePage() {
  const { data: juegos, error } = await supabase.from('juegos').select('*');

  if (error) {
    return <div className="p-8 text-red-500">Error al cargar datos de Supabase.</div>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        🎮 Mi Catálogo de Videojuegos
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {juegos?.map((juego) => (
          <div key={juego.id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
            <img src={juego.imagen_url} alt={juego.titulo} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{juego.titulo}</h2>
              <p className="text-sm text-gray-600 mb-4">{juego.descripcion.substring(0, 80)}...</p>
              
              <div className="flex justify-between items-center">
                <Link 
                  href={`/juegos/${juego.id}`} 
                  className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
                >
                  Ver Detalle
                </Link>
                <Link 
                  href={`/categorias/${juego.categoria}`} 
                  className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-300 text-sm capitalize"
                >
                  {juego.categoria}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}