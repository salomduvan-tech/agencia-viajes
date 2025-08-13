import React from "react";
import { useParams, Link } from "react-router-dom";
import destinos from "../data/destinos";

export default function DestinoDetalle() {
  const { nombre } = useParams();
  const destino = destinos.find(
    (d) => d.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!destino) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Destino no encontrado</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={destino.img}
        alt={destino.nombre}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h2 className="text-3xl font-bold mb-4">{destino.nombre}</h2>
      <p className="text-gray-600 mb-4">{destino.descripcion}</p>
      <p className="text-xl font-semibold text-blue-600 mb-6">
        Desde ${destino.precio.toLocaleString()} COP
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver
      </Link>
    </div>
  );
}
