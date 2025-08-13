// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import DestinoDetalle from "./pages/Destinodetalle";
import Contacto from "./pages/Contacto";

export default function App() {
  return (
    
      <div className="flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Mi Agencia de Viajes</h1>
            <nav className="flex gap-4">
              <Link to="/" className="hover:underline">Inicio</Link>
              <Link to="/contacto" className="hover:underline">Contacto</Link>
            </nav>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destino/:nombre" element={<DestinoDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          © {new Date().getFullYear()} Mi Agencia de Viajes. Todos los derechos reservados.
        </footer>
      </div>
    
  );
}
