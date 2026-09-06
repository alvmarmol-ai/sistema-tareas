import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: juegos, error } = await supabase
    .from('juegos')
    .select('*')
    .eq('categoria', slug);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver al inicio
      </Link>
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Categoría: <span className="text-blue-600">{slug}</span>
      </h1>

      {juegos?.length === 0 ? (
        <p>No se encontraron juegos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {juegos?.map((juego) => (
            <div key={juego.id} className="border p-4 rounded-lg bg-white shadow">
              <h2 className="text-xl font-bold">{juego.titulo}</h2>
              <p className="text-gray-600 my-2">{juego.descripcion}</p>
              <Link href={`/juegos/${juego.id}`} className="text-blue-600 hover:underline font-semibold text-sm">
                Ver Ficha Completa →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}