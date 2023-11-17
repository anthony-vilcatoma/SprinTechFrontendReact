import { useEffect } from 'react';
import { Button } from 'flowbite-react';
import { LayaoutDashboard } from '../../components/LayaoutDashboard'
import { getUserLocation } from '../../assets/js/userLocation';
import { getTechnicallsByLocation } from '../../apis/Client/TechnicalsApi'
import '../../assets/css/googlemaps.css'
import { useState } from 'react';
import icon from '../../assets/images/iconPersonMap.png'
import banderita from '../../assets/images/banderita.png'
import { DirectRequestModal } from '../../components/DirectRequestModal';

import { getCategoriesByService, getProfessions } from '../../apis/Client/ProfessionApi';
import { getAllOptionsAvailability } from '../../apis/Client/availability';
import { TechnicalDiv } from '../../components/Client/TechnicalDiv';



export function ServicePage() {
    //Guardamos el token para poder llenarla en cualquier peticion
    const accessToken = localStorage.getItem("access_token");


    //Load the Necesary Information in the form to look at or get the service
    const [professions, setProfessions] = useState([]);
    const [avalibalities, setAvalibalities] = useState([]);
    const [categoryByService, setCategoryByService] = useState([]);
    const [technicals, setTechnicals] = useState([]);

    const [dataApiProcedure, setDataApiProcedure] = useState({
        professionId: null,
        availabilityId: null,
        latitude: null,
        longitude: null,
        distance: null,
        title: '',
        description: '',
        images: [],
    });

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        images: [],
    });

    const handleFormValuesUpdate = (updatedFormValues) => {
        setFormValues(updatedFormValues);
    };






    const handleInputChangeApiProcedure = (event) => {
        const { name, value } = event.target;
        setDataApiProcedure({ ...dataApiProcedure, [name]: value });
    }




    const handleInputSelectLocation = async (event) => {
        const { value } = event.target;
        if (value == "1") {
            initializeMap();
            const userLocation = await getUserLocation();
            setDataApiProcedure({
                ...dataApiProcedure,
                latitude: userLocation.lat,
                longitude: userLocation.lng
            });


        }

        if (value == "2") {
            const userLocation = await getUserLocation();

            const map = new google.maps.Map(document.getElementById('map'), {
                center: userLocation,
                zoom: 15
            });
            const iconSize = new window.google.maps.Size(35, 40);

            let marker = new google.maps.Marker({
                map: map,
                icon: {
                    url: banderita,
                    scaledSize: iconSize,
                },
                draggable: true,
                animation: google.maps.Animation.DROP,
            });

            let infowindow = new google.maps.InfoWindow({
                content: '<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Solicitar Aqui!</button>'
            });

            google.maps.event.addListener(map, 'click', function (event) {
                marker.setPosition(event.latLng);
                marker.setMap(map);
                setDataApiProcedure({
                    ...dataApiProcedure,
                    latitude: marker.getPosition().lat(),
                    longitude: marker.getPosition().lng()
                });
            });

            marker.addListener('dragend', function (event) {
                infowindow.open(map, marker);
            });
        }
    }


    const [isOpenModal, setIsOpenModal] = useState(false);

    const initializeMap = async () => {
        try {
            const userLocation = await getUserLocation();
            const infoWindow = new window.google.maps.InfoWindow();

            const map = new window.google.maps.Map(document.getElementById("map"), {
                zoom: 16,
                center: userLocation,
            });


            const iconSize = new window.google.maps.Size(35, 40);

            const userMarker = new window.google.maps.Marker({
                position: userLocation,
                map: map,
                title: "",
                icon: {
                    url: icon,
                    scaledSize: iconSize,
                },
            });




            infoWindow.setContent('¡Esta es tu ubicación!');
            infoWindow.open(map, userMarker);
        } catch (error) {
            console.error("Error occurred while initializing map:", error);
        }
    };



    const loadNewMap = async (event) => {
        event.preventDefault()
        try {


            const map = new window.google.maps.Map(document.getElementById("map"), {
                zoom: 14,
                center: { lat: dataApiProcedure.latitude, lng: dataApiProcedure.longitude },
            });

            const iconSize = new window.google.maps.Size(35, 40);
            const infoWindow = new window.google.maps.InfoWindow();

            const userMarker = new window.google.maps.Marker({
                position: { lat: dataApiProcedure.latitude, lng: dataApiProcedure.longitude },
                map: map,
                title: "",
                icon: {
                    url: icon,
                    scaledSize: iconSize,
                },
            });

            infoWindow.setContent('¡Esta es tu ubicación!');
            infoWindow.open(map, userMarker);


            console.log(dataApiProcedure)

            //Cargando a todos los tecnicos 
            getTechnicallsByLocation(accessToken, dataApiProcedure.professionId, dataApiProcedure.availabilityId, dataApiProcedure.latitude, dataApiProcedure.longitude, dataApiProcedure.distance)
                .then(data => {
                    console.log(data.data.body);
                    const technicals = data.data.body;
                    setTechnicals(technicals)
                    technicals.forEach(element => {
                        const marker = new window.google.maps.Marker({
                            position: { lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) },
                            map: map,
                        })
                    })
                })


        } catch (error) {
            console.error("Error occurred while initializing map:", error);
        }
        console.log(formValues)
    };


    useEffect(() => {

        try {
            getProfessions(accessToken)
                .then(data => {
                    setProfessions(data.data.body)
                });

            getAllOptionsAvailability(accessToken)
                .then(data => {
                    setAvalibalities(data.data.body)
                });

            getCategoriesByService(accessToken)
                .then(data => {
                    setCategoryByService(data.data.body)
                })

        } catch (error) {

        }






        // Check if the Google Maps script is already loaded
        if (!window.google) {
            // Load the Google Maps script
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBihRqZC1ca4ienBNShbR6ZtNPoLxkrntU&callback=initMap&v=weekly`;
            script.defer = true;
            document.head.appendChild(script);

            // Set the initMap function to your custom initializeMap function
            window.initMap = initializeMap;

            // Clean up resources when the component is unmounted
            return () => {
                document.head.removeChild(script);
                window.initMap = undefined;
            };
        } else {
            // If the script is already loaded, directly initialize the map
            initializeMap();


        }

    }, []); // The empty dependency ensures that this effect runs only once

    return (
        <LayaoutDashboard>
            <div className="map-form  bg-white flex flex-row w-10/12 mx-auto mb-48 mt-24 rounded-2xl shadow-2xl">
                <div className="w-7/12 h-full ">
                    <div className="bg-gray-100 rounded-l-2xl h-full w-full" id='map'>

                    </div>

                </div>
                <div className="w-5/12 	">
                    <form action="">
                        <div className="flex w-9/12 mx-auto justify-between items-center">
                            <div className="title mx-auto w-9/12 h-5 mt-9 mb-12 text-2xl font-semibold">
                                BUSCA A TU TECNICO
                            </div>
                            <select
                                name='distance'
                                onChange={handleInputChangeApiProcedure}
                                className="form-select-map  p-2 block w-4/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                                <option disabled selected value>Rango</option>
                                <option value="5">5 Kilometro</option>
                                <option value="7">7 Kilometros</option>
                                <option value="10">10 Kilometros</option>

                            </select>
                        </div>

                        <select
                            name='professionId'
                            onChange={handleInputChangeApiProcedure}
                            className="form-select-map  py-3 px-4 pr-9 block w-9/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 mx-auto mb-8">
                            <option disabled selected value>Seleccione la Profession</option>
                            {professions.map(opcion => (
                                <option key={opcion.id} value={opcion.id}>{opcion.name}</option>
                            ))}
                        </select>
                        <select
                            className="form-select-map  py-3 px-4 pr-9 block w-9/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 mx-auto mb-8">
                            {categoryByService.map(opcion => (
                                <option key={opcion.id} value={opcion.id}>{opcion.name} </option>
                            ))}
                        </select>
                        <select
                            name='availabilityId'
                            onChange={handleInputChangeApiProcedure}

                            className="form-select-map  py-3 px-4 pr-9 block w-9/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 mx-auto mb-8">
                            <option disabled selected value>Disponibilidad del tecnico</option>
                            {avalibalities.map(opcion => (
                                <option key={opcion.id} value={opcion.id}>{opcion.name}</option>
                            ))}
                        </select>

                        <div className="w-9/12 flex justify-between mx-auto">
                            <select
                                onChange={handleInputSelectLocation}
                                className="form-select-map  py-3 px-4 pr-9 block w-5/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5  mb-8">
                                <option disabled selected value>Elige tu Ubicación</option>
                                <option value="1">Mi ubicación</option>
                                <option value="2">Otra Ubicación</option>
                            </select>
                            <Button
                                style={{ height: '68px' }}
                                className='bg-blue-400 text-4xl'
                                onClick={() => setIsOpenModal(true)}>DETALLA TU PROBLEMA</Button>
                            {isOpenModal && <DirectRequestModal
                                onCloseModal={() => setIsOpenModal(false)}
                                isOpen={isOpenModal}
                                onUpdateFormValues={handleFormValuesUpdate}
                            />}
                        </div>



                        <button onClick={loadNewMap} className="boton_buscar block w-9/12 font-bold	 text-2xl p-3 mx-auto rounded-md">BUSCAR
                            ESPECIALISTAS</button>
                    </form>
                </div>
            </div>


            <div className="container flex mx-auto justify-around w-11/12">
                <div className="specialist-all  pb-5 px-8 mb-24  bg-white  rounded-2xl shadow-2xl">
                    <div className="w-full flex pt-6 px-6 mt-9 justify-around  ">
                        <div className="w-60 h-60  rounded-full">
                            <img src="https://media.licdn.com/dms/image/D4E03AQGL3n6z72AIWw/profile-displayphoto-shrink_400_400/0/1672936799998?e=1703116800&v=beta&t=IrO6HtIhjunq9u1PPhN_kWXVvML7YS6us2AuhP0vCFU" width="100%" height="100%" className="rounded-full" />
                        </div>
                        <div className="information w-6/12 pt-6">
                            <ul>
                                <li><b>ESPECIALIDAD:</b> MECANICA</li>
                                <li><b>NOMBRES:</b> BRUNO RAUL</li>
                                <li><b>APELLIDOS:</b> CHIGNE MEDINA</li>
                                <li><b>EDAD:</b> 25 AÑOS</li>
                            </ul>
                        </div>
                    </div>
                    <h1 className="comentario mt-5 font-bold">COMENTARIOS</h1>
                    <hr className="borde-comentario rounded mb-5" />
                    <div className="flex justify-between w-full ">
                        <div className="card-son comentary	 p-8 rounded-2xl">
                            <div className="img-person w-20 bg-black h-20 rounded-full bg-slate-900 mb-8">
                                <img src="https://media.licdn.com/dms/image/D4E03AQE9EqK4v0CaAg/profile-displayphoto-shrink_800_800/0/1697438926791?e=1703116800&v=beta&t=rGp1YLWoVBFbDDouVNhPSFUfSouDi3xJoehU8_TkyyE" height="100%" width="100%" className="rounded-full" alt="" />
                            </div>

                            <div className="flex items-center space-x-3 mb-5">
                                <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-6 h-6 block text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-6 h-6 block text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-6 h-6 block text-yellow-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-6 block h-6 text-gray-300" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path
                                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            </div>

                            <p className="comentario text-base mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quidem, rem id expedita accusamus dicta cupiditate..</p>
                            <h1 className="text-xl font-semibold">Miguel Sarmiento</h1>

                        </div>
                        <div className="w-5/12 flex flex-col items-center">
                            <div className="habilities w-11/12 rounded-2xl">
                                <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                                    <span className="text-base font-semibold mb-3 ml-2 block">Comunicación</span>
                                    <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                                        <div className="lvl-data w-10/12 h-full bg-green-600 rounded"></div>
                                    </div>
                                </div>
                                <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                                    <span className="text-base font-semibold mb-3 ml-2 block">Experiencia</span>
                                    <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                                        <div className="lvl-data w-6/12 h-full bg-green-600 rounded"></div>
                                    </div>
                                </div>
                                <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                                    <span className="text-base font-semibold mb-3 ml-2 block">Puntualidad</span>
                                    <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                                        <div className="lvl-data w-9/12 h-full bg-green-600 rounded"></div>
                                    </div>
                                </div>
                                <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                                    <span className="text-base font-semibold mb-3 ml-2 block">Trabajo</span>
                                    <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                                        <div className="lvl-data w-6/12 h-full bg-green-600 rounded"></div>
                                    </div>
                                </div>
                            </div>

                            <form className="w-11/12" action="">
                                <button
                                    className="boton_buscar mt-4 flex items-center justify-center w-full font-bold	 text-2xl p-3 mx-auto rounded-md">SOLICITAR</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="listadoespecialistas w-4/12 overflow-y-scroll	">


                    {technicals.map(opcion => (
                        <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                            <div className="information-request w-7/12">
                                <ul>
                                    <li>
                                        <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> {opcion.name}</p>

                                    </li>
                                    <li>
                                        <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> {opcion.lastname}</p>
                                    </li>
                                    <li>
                                        <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> {opcion.birthDate}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="botones w-6/12 flex items-center justify-around">
                                <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                                <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                            </div>
                            {professions
                                .filter(profession => profession.name === 'Mecanico')
                                .map(electricistaProfession => (
                                    <span className=" absolute right-7 top-2 font-semibold text-gray-400">{electricistaProfession.name}</span>

                                ))}
                        </div>))}



                </div>
            </div>
        </LayaoutDashboard>

    );
}