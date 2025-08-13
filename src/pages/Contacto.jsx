// src/pages/Contacto.jsx
import React from "react";

export default function Contacto() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contáctanos</h1>
      <form className="grid gap-4">
        <input type="text" placeholder="Nombre" className="border p-2 rounded" />
        <input type="email" placeholder="Correo" className="border p-2 rounded" />
        <textarea placeholder="Mensaje" className="border p-2 rounded"></textarea>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
}
