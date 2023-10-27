import React, { useEffect } from 'react';

import '../assets/css/sidebar.css'
export function Sidebar() {
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
                        <img src="../src/assets/images/logo.png" alt=""/>
                    </span>

                    <div className="text logo-text">
                        <span className="name">Codinglab</span>
                        <span className="profession">Web developer</span>
                    </div>
                </div>

                <i className='bx bx-chevron-right toggle'></i>
            </header>

            <div className="menu-bar">
                <div className="menu">

                    <li className="search-box">
                        <i className='bx bx-search icon'></i>
                        <input type="text" placeholder="Search..."/>
                    </li>

                    <ul className="menu-links">
                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-home-alt icon'></i>
                                <span className="text nav-text">Dashboard</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-bar-chart-alt-2 icon'></i>
                                <span className="text nav-text">Revenue</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-bell icon'></i>
                                <span className="text nav-text">Notifications</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-pie-chart-alt icon'></i>
                                <span className="text nav-text">Analytics</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-heart icon'></i>
                                <span className="text nav-text">Likes</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className='bx bx-wallet icon'></i>
                                <span className="text nav-text">Wallets</span>
                            </a>
                        </li>

                    </ul>
                </div>

                <div className="bottom-content">
                    <li className="">
                        <a href="#">
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