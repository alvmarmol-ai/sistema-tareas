'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerJuegos() {
      try {
        const { data, error: err } = await supabase.from('juegos').select('*');
        if (err) {
          setError(`Error de base de datos: ${err.message}`);
        } else {
          setJuegos(data || []);
        }
      } catch (e: any) {
        setError(`Excepción: ${e.message}`);
      } finally {
        setCargando(false);
      }
    }

    obtenerJuegos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Catálogo de Videojuegos</h1>

        {cargando && <p className="text-center text-gray-400">Cargando catálogo...</p>}

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            <p className="font-semibold">Ocurrió un detalle:</p>
            <p className="text-sm font-mono mt-1">{error}</p>
          </div>
        )}

        {!cargando && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {juegos.map((juego) => (
              <div key={juego.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-2">{juego.titulo}</h2>
                <p className="text-gray-400 text-sm mb-4">{juego.descripcion || 'Sin descripción'}</p>
                <span className="inline-block bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  ${juego.precio}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}