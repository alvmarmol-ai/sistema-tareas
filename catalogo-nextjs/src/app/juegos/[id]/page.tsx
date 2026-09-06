import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JuegoDetallePage({ params }: PageProps) {
  const { id } = await params;

  const { data: juego, error } = await supabase
    .from('juegos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !juego) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver al inicio
      </Link>
      <div className="bg-white border rounded-lg overflow-hidden shadow-xl">
        <img src={juego.imagen_url} alt={juego.titulo} className="w-full h-64 object-cover" />
        <div className="p-6">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded capitalize">
            {juego.categoria}
          </span>
          <h1 className="text-3xl font-bold my-3">{juego.titulo}</h1>
          <p className="text-gray-700 leading-relaxed">{juego.descripcion}</p>
        </div>
      </div>
    </main>
  );
}