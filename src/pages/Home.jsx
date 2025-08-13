import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import destinos from "../data/destinos";
import { FaCalendarAlt, FaSearch, FaMapMarkerAlt, FaPlane, FaHotel, FaCar, FaUsers, FaStar, FaClock, FaArrowRight } from "react-icons/fa";

// Datos de ofertas (agrégalas a tu carpeta data si quieres)
const ofertas = [
  {
    titulo: "Paquete Caribe",
    subtitulo: "Cartagena + San Andrés",
    descuento: 25,
    precio: 850000,
    precioOriginal: 1130000,
    img: "/img/paquete_caribe.jpg"
  },
  {
    titulo: "Escapada Urbana",
    subtitulo: "Medellín + Bogotá",
    descuento: 20,
    precio: 560000,
    precioOriginal: 700000,
    img: "/img/escapada_urbana.jpg"
  }
];

export default function Home() {
  const [tipoViaje, setTipoViaje] = useState('vuelos');
  const [filtroDestino, setFiltroDestino] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [pasajeros, setPasajeros] = useState(1);
  const [resultados, setResultados] = useState(destinos);
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    AOS.init({});
  }, []);

  const formatearFecha = (fecha) => {
    const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(fecha).toLocaleDateString("es-CO", opciones);
  };

  const buscarDestinos = () => {
    if (!fechaInicio || !fechaFin) {
      setMensajeError("Debes seleccionar ambas fechas para buscar.");
      setTimeout(() => setMensajeError(""), 3000);
      return;
    }

    setCargando(true);
    
    // Simular búsqueda con delay para mejor UX
    setTimeout(() => {
      let filtrados = destinos.filter((dest) => {
        const coincideNombre = dest.nombre
          .toLowerCase()
          .includes(filtroDestino.toLowerCase());

        const inicioBusqueda = new Date(fechaInicio);
        const finBusqueda = new Date(fechaFin);

        const coincideFecha = dest.disponibilidad.some((rango) => {
          const inicioRango = new Date(rango.inicio);
          const finRango = new Date(rango.fin);
          return inicioBusqueda >= inicioRango && finBusqueda <= finRango;
        });

        return coincideNombre && coincideFecha;
      });

      setResultados(filtrados);
      setCargando(false);
    }, 800);
  };

  const coincideConBusqueda = (rango) => {
    if (!fechaInicio || !fechaFin) return false;
    return fechaInicio >= rango.inicio && fechaFin <= rango.fin;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <FaPlane className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TuViaje.co</span>
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Vuelos</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Hoteles</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Paquetes</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Mi cuenta</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-20 px-4">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Explora el mundo con nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 opacity-90"
          >
            Los mejores destinos al mejor precio
          </motion.p>

          {/* Tabs de tipo de viaje */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-t-xl p-1 inline-flex mb-0"
          >
            {[
              { id: 'vuelos', icon: FaPlane, label: 'Vuelos' },
              { id: 'hoteles', icon: FaHotel, label: 'Hoteles' },
              { id: 'autos', icon: FaCar, label: 'Autos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTipoViaje(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  tipoViaje === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Buscador mejorado */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-b-xl rounded-tr-xl shadow-2xl p-6 text-gray-800"
          >
            {mensajeError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              >
                {mensajeError}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="¿A dónde quieres ir?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={filtroDestino}
                  onChange={(e) => setFiltroDestino(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>

              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>

              <div className="relative">
                <FaUsers className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={pasajeros}
                  onChange={(e) => setPasajeros(parseInt(e.target.value))}
                >
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>{n} pasajero{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={buscarDestinos}
                disabled={cargando}
                className="bg-orange-500 text-white rounded-lg py-3 px-6 font-bold hover:bg-orange-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 transform hover:scale-105"
              >
                {cargando ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaSearch className="h-4 w-4" />
                    <span>Buscar</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ofertas especiales */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 mb-8"
        >
          <FaClock className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold">Ofertas por tiempo limitado</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ofertas.map((oferta, i) => (
            <motion.div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex">
                <img
                  src={oferta.img}
                  alt={oferta.titulo}
                  className="w-32 h-32 object-cover"
                />
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{oferta.titulo}</h3>
                      <p className="text-gray-600">{oferta.subtitulo}</p>
                    </div>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold animate-pulse">
                      -{oferta.descuento}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-500">
                      ${oferta.precio.toLocaleString()} COP
                    </span>
                    <span className="text-gray-500 line-through">
                      ${oferta.precioOriginal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Destinos */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Destinos disponibles</h2>

        {cargando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : resultados.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaMapMarkerAlt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron destinos con esos filtros.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {resultados.map((destino, i) => (
              <motion.div
                key={i}
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={destino.img}
                    alt={destino.nombre}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Rating badge */}
                  {destino.rating && (
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1 shadow-lg">
                      <FaStar className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium">{destino.rating}</span>
                    </div>
                  )}
                  
                  {/* Category badge */}
                  {destino.categoria && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {destino.categoria}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-xl mb-3">{destino.nombre}</h4>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${destino.precio.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">COP por persona</span>
                  </div>

                  {/* Fechas de disponibilidad mejoradas */}
                  <div className="mb-6">
                    <p className="text-green-600 font-semibold flex items-center gap-2 mb-2">
                      <FaCalendarAlt className="h-4 w-4" />
                      Fechas disponibles:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {destino.disponibilidad.map((r, idx) => {
                        const esCoincidente = coincideConBusqueda(r);
                        return (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                              esCoincidente
                                ? "bg-green-500 text-white shadow-lg"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            <FaCalendarAlt className="h-3 w-3" />
                            {formatearFecha(r.inicio)} → {formatearFecha(r.fin)}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/destino/${destino.nombre.toLowerCase()}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group"
                    >
                      <span>Ver detalles</span>
                      <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Footer mejorado */}
      <footer className="bg-gray-800 text-white py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FaPlane className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">TuViaje.co</span>
            </div>
            <p className="text-gray-400">Tu agencia de viajes de confianza</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Vuelos nacionales</li>
                <li>Hoteles</li>
                <li>Paquetes turísticos</li>
                <li>Alquiler de autos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Destinos populares</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Cartagena</li>
                <li>San Andrés</li>
                <li>Medellín</li>
                <li>Eje Cafetero</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +57 1 234 5678</li>
                <li>✉️ info@tuviaje.co</li>
                <li>📍 Bogotá, Colombia</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}