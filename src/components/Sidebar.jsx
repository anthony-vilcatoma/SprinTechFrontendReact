import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/css/sidebar.css'
import logo from '../assets/images/logoUniway.jpg'
import { Link, useNavigate } from 'react-router-dom';
export function Sidebar() {
    const token = window.localStorage.getItem("access_token");
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const role = decodedToken.roleId;
    const { isAuthenticated, logout, checkoutLogin } = useAuth()

    useEffect(() => {
        const body = document.querySelector('body');
        const sidebar = body.querySelector('nav');
        const toggle = body.querySelector('.toggle');
        const searchBtn = body.querySelector('.search-box');
        const modeSwitch = body.querySelector('.toggle-switch');
        const modeText = body.querySelector('.mode-text');

        const handleToggleClick = () => {
            sidebar.classList.toggle('close');
        };

        const handleSearchClick = () => {
            sidebar.classList.remove('close');
        };

        const handleModeSwitchClick = () => {
            body.classList.toggle('dark');

            if (body.classList.contains('dark')) {
                modeText.innerText = 'Light mode';
            } else {
                modeText.innerText = 'Dark mode';
            }
        };

        toggle.addEventListener('click', handleToggleClick);
        searchBtn.addEventListener('click', handleSearchClick);
        modeSwitch.addEventListener('click', handleModeSwitchClick);

        // Limpiar los event listeners cuando el componente se desmonta
        return () => {
            toggle.removeEventListener('click', handleToggleClick);
            searchBtn.removeEventListener('click', handleSearchClick);
            modeSwitch.removeEventListener('click', handleModeSwitchClick);
        };
    }, []); // Dependencia vacía para asegurar que el useEffect se ejecute solo una vez (equivalente a componentDidMount)

    return (
        <>
            <nav className="sidebar close">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={logo} alt="" />
                        </span>

                        <div className="text logo-text">
                            <span className="name">UniWay</span>
                            <span className="profession">Llegamos a ti!</span>
                        </div>
                    </div>

                    <i className='bx bx-chevron-right toggle'></i>
                </header>

                <div className="menu-bar">
                    <div className="menu">

                        <li className="search-box">
                            <i className='bx bx-search icon'></i>
                            <input type="text" placeholder="Search..." />
                        </li>

                        <ul className="menu-links">
                            
                            {role==1 ? (<li className="nav-link">
                                <Link to={"/buscar-tecnico"}>
                                    <i className='bx bx-search-alt icon'></i>
                                    <span className="text nav-text">Busca tu tecnico</span>
                                </Link>
                            </li>) : "" }
                            
                            {
                                role==2 ? (<li className="nav-link">
                                <Link to={"/servicio/configuracion"}>
                                    <i className='bx bx-wallet-alt icon'></i>
                                    <span className="text nav-text">Servicios</span>
                                </Link>
                            </li>) : ""
                            }
                            
                            {
                                role==2 ? (<li className="nav-link">
                                <Link to={"/solicitudes-recibidas"}>
                                    <i className='bx bx-briefcase-alt-2 icon' ></i>
                                    <span className="text nav-text">Solicitudes Recibidas</span>
                                </Link>
                            </li>) : ""
                            }
                            
                            
                            {
                                role==1 ? (<li className="nav-link">
                                <Link to={"/mis-solicitudes"}>
                                <i className='bx bx-news icon' ></i>
                                <span className="text nav-text">Tus solicitudes</span>
                                </Link>
                            </li>) : ""
                            }
                            

                            
                            <li className="nav-link">
                            <Link to={"/ticket-reclamo"}>
                                <i className='bx bx-message-alt-error icon' ></i>
                                <span className="text nav-text">Reclamos</span>
                                </Link>
                            </li>

                            
                            {
                                role==3 ? (<li className="nav-link">
                                <Link to={"/lista-reclamos"}>
                                    <i className='bx bx-wallet icon'></i>
                                    <span className="text nav-text">Atender Reclamos</span>
                                </Link>
                            </li>) : ""
                            }
                            
                            <li className="nav-link">
                            <Link to={"/configuracion"}>
                                    <i className='bx bx-cog icon' ></i>
                                    <span className="text nav-text">Configuración</span>
                                    </Link>
                            </li>

                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="">
                            <a onClick={() => {
                                // Eliminará el token del localstorage
                                logout()
                            }}>
                                <i className='bx bx-log-out icon'></i>
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>

                        <li className="mode">
                            <div className="sun-moon">
                                <i className='bx bx-moon icon moon'></i>
                                <i className='bx bx-sun icon sun'></i>
                            </div>
                            <span className="mode-text text">Dark mode</span>

                            <div className="toggle-switch">
                                <span className="switch"></span>
                            </div>
                        </li>

                    </div>
                </div>

            </nav>
        </>

    );
}