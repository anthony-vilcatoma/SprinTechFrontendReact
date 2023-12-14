import React from 'react';
import '../assets/css/home.css'; // Importa tus estilos CSS personalizados
import imagenLogo from '../assets/images/logo-springtec.svg'; // Importa la imagen del logo
import imagenTecnicos1 from '../assets/images/tecnicos1.svg'; // Importa la imagen de tecnicos1
import imagenTestimonio1 from '../assets/images/testimonio1.svg'; // Importa la imagen de testimonio1
import imagenEstrellas from '../assets/images/img-estrellas.svg'; // Importa la imagen de estrellas
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
    <div className="home-page">

      <header style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container mx-auto px-10" >
          <nav className="flex justify-between">
            <img src={imagenLogo} width="70" alt="logo springtec" />
            <div className="flex flex-row items-center">
              <ul className="flex gap-x-10 mr-10 font-semibold text-gray-500">
                <li className="hover:text-gray-400">Home</li>
                <li className="hover:text-gray-400">About</li>
                <li className="hover:text-gray-400">Services</li>
                <li className="hover:text-gray-400">Contact</li>
              </ul>
              <div>
                <Link to={"/login"} className="bg-personalized rounded px-4 py-1.5 text-white font-semibold mr-1">
                Login

                </Link>
                <Link to={"/register"} className="bg-personalized rounded px-4 py-1.5 text-white font-semibold">
                  Register
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto">
        <section className="flex flex-row justify-around items-stretch" style={{ height: '95vh' }}>
          <div className="self-center">
            <h1 className="text-7xl font-semibold text-left">Encuentra Técnicos <br /> de Confianza <br /> en Línea</h1>
            <p className="text-gray-400 font-medium text-xl mt-28">
              Tu Plataforma de Confianza para Reparaciones <br /> y Mantenimiento en el Hogar
            </p>
            <div className="flex flex-row mt-8 gap-x-4">
              <a href='service' className="bg-personalized rounded-lg px-4 py-1.5 text-white font-semibold text-xs flex w-32 text-center">
                CONTACTA A UN TÉCNICO
              </a>
              <a   className="bg-personalized rounded-lg px-4 py-1.5 text-white font-semibold text-xs flex w-32 text-center">
                ¡TRABAJA CON NOSOTROS!
              </a>
            </div>
          </div>
          <img src={imagenTecnicos1} width="500" alt="Técnicos" />
        </section>

        <section style={{ height: '95vh' }}>
          <div className="text-center mb-20">
            <h2 className="text-4xl font-semibold">ACERCA</h2>
            <p className="text-lg text-gray-400 font-medium">
              Tu Plataforma de Confianza para Reparaciones y Mantenimiento en el Hogar
            </p>
          </div>

          <div className="flex flex-row justify-around">
            <img src={imagenTecnicos1} width="500" alt="Técnicos" />
            <div className="text-center self-center" style={{ width: '550px' }}>
              <h3 className="font-semibold text-2xl">MISIÓN</h3>
              <p className="text-gray-500 font-medium mb-16">
                Nuestra misión es brindar una plataforma en línea que conecta a usuarios con técnicos confiables y calificados, simplificando la búsqueda y contratación de servicios técnicos. Estamos comprometidos en facilitar la vida de las personas al proporcionar acceso rápido y seguro a profesionales en todo momento y lugar.
              </p>
              <h3 className="font-semibold text-2xl">VISIÓN</h3>
              <p className="text-gray-500 font-medium">
                Nuestra visión es convertirnos en la principal plataforma en línea para la búsqueda y contratación de servicios técnicos en el país. Aspiramos a ser reconocidos por nuestra excelencia en la atención al cliente, la calidad de los técnicos que ofrecemos y por ser un motor de crecimiento para los profesionales técnicos. Buscamos transformar la forma en que las personas acceden y disfrutan de los servicios técnicos, brindando comodidad, confiabilidad y satisfacción en cada interacción.
              </p>
            </div>
          </div>
        </section>

        <section style={{ height: '90vh' }}>
          <div className="text-center mb-28">
            <h2 className="text-4xl font-semibold">TESTIMONIOS</h2>
            <p className="text-lg text-gray-400 font-medium">Que opina la gente sobre SpringTec</p>
          </div>

          <div className="flex flex-wrap justify-around">
            <div className="card grid gap-y-5 w-80 rounded-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
              <img src={imagenTestimonio1} alt="Testimonio 1" />
              <img src={imagenEstrellas} alt="Estrellas" />
              <p className="text-gray-400">Recomiendo a cualquiera comprar una casa en D'casa. Recibí un excelente servicio al cliente de los especialistas que me ayudaron.</p>
              <h5 className="text-2xl font-medium">Jaime Gomez</h5>
            </div>
            
            <div className="card grid gap-y-5 w-80 rounded-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
              <img src={imagenTestimonio1} alt="Testimonio 1" />
              <img src={imagenEstrellas} alt="Estrellas" />
              <p className="text-gray-400">Recomiendo a cualquiera comprar una casa en D'casa. Recibí un excelente servicio al cliente de los especialistas que me ayudaron.</p>
              <h5 className="text-2xl font-medium">Jaime Gomez</h5>
            </div>

            <div className="card grid gap-y-5 w-80 rounded-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
              <img src={imagenTestimonio1} alt="Testimonio 1" />
              <img src={imagenEstrellas} alt="Estrellas" />
              <p className="text-gray-400">Recomiendo a cualquiera comprar una casa en D'casa. Recibí un excelente servicio al cliente de los especialistas que me ayudaron.</p>
              <h5 className="text-2xl font-medium">Jaime Gomez</h5>
            </div>
          </div>
        </section>
      </div>
      </div>

    </>

  );
};
