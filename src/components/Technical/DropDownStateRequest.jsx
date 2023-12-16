import { useState } from 'react';
import { showAllDirectRequestToOneTechnical, showAllDirectRequestToOneTechnicalAlreadyInvoice } from '../../apis/Client/DirectRequest';
export default function DropDownStateRequest({ changeRequests,technicalId,setUbication }) {
    const [optionSelected, setOptionSelected] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const loadAllAlreadyInvoice = () => {
        const token = window.localStorage.getItem("access_token")
        showAllDirectRequestToOneTechnicalAlreadyInvoice(token, technicalId, 1)
            .then(res => {
                changeRequests(res.data.body)
                console.log(res.data.body)
                setUbication({lat:null,lng:null})
            })
    }

    const loadAllDirectRequestNoInvoce = () => {
        const token = window.localStorage.getItem("access_token")
        showAllDirectRequestToOneTechnical(token, technicalId, 1)
            .then(res => {
                changeRequests(res.data.body)
                setUbication({lat:null,lng:null})

            })
    }

    const loadAllInProcess = () => {
        const token = window.localStorage.getItem("access_token")
        showAllDirectRequestToOneTechnicalAlreadyInvoice(token, technicalId, 2)
            .then(res => {
                changeRequests(res.data.body)
                setUbication({lat:null,lng:null})
            })
    }
    console.log("cambia de estado")
    return (
        <div className="relative inline-block w-11/12 text-left">
            <div>
                <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex bg-orange-personalized flex justify-center items-center w-full h-12 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300  font-bold"
                    id="menu-button"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                >
                    SELECCIONE EL TIPO DE SOLICITUD
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div
                className={`absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
            >
                <div className="py-1" role="none">
                    <button
                        onClick={loadAllDirectRequestNoInvoce}
                        className="border-none focus:outline-none focus:border-none text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                    >
                        Recientes
                    </button>
                    <button onClick={loadAllAlreadyInvoice} className=" border-none focus:outline-none  text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
                        Tarifados
                    </button>
                    <button onClick={loadAllInProcess} className="border-none focus:outline-none text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                        En Proceso
                    </button>

                </div>
            </div>
        </div>
    );
}
