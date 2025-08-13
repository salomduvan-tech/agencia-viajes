// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import destinos from "../data/destinos";
import { FaCalendarAlt } from "react-icons/fa";

export default function Home() {
  const [filtroDestino, setFiltroDestino] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [resultados, setResultados] = useState(destinos);

  useEffect(() => {
    AOS.init({});
  }, []);

  const formatearFecha = (fecha) => {
    const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(fecha).toLocaleDateString("es-CO", opciones);
  };

  // Buscar destinos al presionar el botón
  const buscarDestinos = () => {
    let filtrados = destinos.filter((dest) => {
      const coincideNombre = dest.nombre
        .toLowerCase()
        .includes(filtroDestino.toLowerCase());

      let coincideFecha = true;
      if (fechaInicio && fechaFin) {
        const inicioBusqueda = new Date(fechaInicio);
        const finBusqueda = new Date(fechaFin);

        coincideFecha = dest.disponibilidad.some((rango) => {
          const inicioRango = new Date(rango.inicio);
          const finRango = new Date(rango.fin);

          // ✅ Solo aparece si la búsqueda está dentro del rango de disponibilidad
          return (
            inicioBusqueda >= inicioRango &&
            finBusqueda <= finRango
          );
        });
      }

      return coincideNombre && coincideFecha;
    });

    setResultados(filtrados);
  };

  const coincideConBusqueda = (rango) => {
    if (!fechaInicio || !fechaFin) return false;
    const inicioBusqueda = new Date(fechaInicio);
    const finBusqueda = new Date(fechaFin);
    return (
      inicioBusqueda >= new Date(rango.inicio) &&
      finBusqueda <= new Date(rango.fin)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-blue-100 py-16 px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4"
        >
          Tu próxima aventura comienza aquí
        </motion.h2>

        {/* Barra de búsqueda */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Destino"
            className="p-2 border rounded"
            value={filtroDestino}
            onChange={(e) => setFiltroDestino(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <button
            onClick={buscarDestinos}
            className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>
      </section>

      {/* Destinos */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Destinos disponibles</h3>

        {resultados.length === 0 ? (
          <p className="text-gray-500">
            No se encontraron destinos con esos filtros.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {resultados.map((destino, i) => (
              <motion.div
                key={i}
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={destino.img}
                  alt={destino.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-lg">{destino.nombre}</h4>
                  <p className="text-sm text-gray-600">
                    Desde ${destino.precio.toLocaleString()} COP
                  </p>

                  {/* Fechas de disponibilidad */}
                  <div className="mt-2">
                    <p className="text-green-600 font-semibold flex items-center gap-1">
                      <FaCalendarAlt /> Fechas disponibles:
                    </p>
                    {destino.disponibilidad.map((r, idx) => {
                      const esCoincidente = coincideConBusqueda(r);
                      return (
                        <span
                          key={idx}
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium m-1 ${
                            esCoincidente
                              ? "bg-green-500 text-white"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {formatearFecha(r.inicio)} → {formatearFecha(r.fin)}
                        </span>
                      );
                    })}
                  </div>

                  <Link
                    to={`/destino/${destino.nombre.toLowerCase()}`}
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    Ver más
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
