import { useEffect } from 'react';
import { LayaoutDashboard } from '../../components/LayaoutDashboard'
import { getUserLocation } from '../../assets/js/userLocation';
import icon from '../../assets/images/iconPersonMap.png'
export function ServicePage() {

    //definimos algunos lugares estaticos (cordenadas)
    const ubications = [{ lat: -11.994802815418084, lng: -76.85871465369739 },
        { lat: -11.997802815418084, lng: -76.86271465369739 },
        { lat: -11.994302815418084, lng: -76.86221465369739 },
        { lat: -11.996802815418084, lng: -76.85971465369739 },
        { lat: -11.993802815418084, lng: -76.86371465369739 }]
    useEffect(() => {

        //traemos nuestra ubicacion y lo almacenamos en la variable location
        getUserLocation()
            .then(location => {
                // definimos la funcion del mapa
                window.initMap =  () => {

                    //creamos una variable la cual sera el centro donde se mostrara el mapa al inicio( con las cordenadas de mi ubicacion)
                    const centro = location

                    // es un objeto que sirve para mostrar informacion adicional en los marcadores
                    const infoWindow = new google.maps.InfoWindow();

                    // Inicializamos el mapa con su centro
                    const map = new google.maps.Map(document.getElementById("map"), {
                        zoom: 16,
                        center: centro,
                    });

                    const iconSize = new google.maps.Size(35, 40); // Ajustamos el tamaño del mercador(iconPersonMap.png)
                    
                    // Creamos un marcador que muestre el iconPersonMap el cual nos dira nuestra ubicacion
                    const marker = new google.maps.Marker({
                        position: centro,
                        map: map,
                        title: "",
                        icon: {
                            url: icon,
                            scaledSize: iconSize,
                        },
                    });
                    
                    //enviamos una informacion con el objeto infdwindow!
                    infoWindow.setContent('Este eres tu!');
                    infoWindow.open(map, marker);

                    //cremos marcadores para cada ubicacion de los lugares staticos definidos anteriormente.
                    ubications.forEach(element => {
                        // Añadimos un marcador con su lugar especifico de cada lugar
                        const marker = new google.maps.Marker({
                            position: element,
                            map: map,
                            title: "",
                            
                        });
                        // Añadimos un evento click para ver informacion adicional del marcador creado.
                        marker.addListener('click', () => {
                            infoWindow.setContent('This is Tecsup!');
                            infoWindow.open(map, marker);
                        });
                    });
                    



                };

                
                // Cargar el script de la API de Google Maps
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBihRqZC1ca4ienBNShbR6ZtNPoLxkrntU&callback=initMap&v=weekly`;
                script.defer = true;
                document.head.appendChild(script);

                // Liberar recursos al desmontar el componente
                return () => {
                    document.head.removeChild(script);
                };
            })


    }, []); 

    return (
        <LayaoutDashboard>
            <div className="map-form max-w-screen-lg bg-white flex flex-row w-8/12 mx-auto mb-48 mt-24 rounded-2xl shadow-2xl">
                <div className="w-6/12 h-full ">
                    <div className="bg-gray-100 rounded-l-2xl h-full w-full" id='map'>

                    </div>

                </div>
                <div className="w-6/12 	">
                    <form action="">
                        <div className="title mx-auto w-9/12 h-5 mt-9 mb-8 text-2xl font-semibold">
                            BUSCA A TU TECNICO
                        </div>
                        <select
                            className="form-select-map  py-3 px-4 pr-9 block w-9/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 mx-auto mb-8">
                            <option value="Oficina del tecnico">Oficina del tecnico</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <select
                            className="form-select-map  py-3 px-4 pr-9 block w-9/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 mx-auto mb-8">
                            <option value="Elige tu tecnico">Grado del tecnico</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <select
                            className="form-select-map  py-3 px-4 pr-9 block w-9/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 mx-auto mb-8">
                            <option value="Elige Disponibilidad">Disponibilidad del tecnico</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>

                        <div className="w-9/12 flex justify-between mx-auto">
                            <select
                                className="form-select-map  py-3 px-4 pr-9 block w-5/12 border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5  mb-8">
                                <option value="Elige tu Ciudad">Elige tu ciudad</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            <select
                                className="form-select-map  py-3 px-4 pr-9 block w-5/12 border-gray-200 rounded-md text-base 	
                                focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5  mb-8">
                                <option value="Elige tu Distrito">Elige tu distrito</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        <button className="boton_buscar block w-9/12 font-bold	 text-2xl p-3 mx-auto rounded-md">BUSCAR
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
                    <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                        <div className="information-request w-7/12">
                            <ul>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> BRUNO RAUL</p>

                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> CHIGNE MEDINA</p>
                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> 45 AÑOS</p>
                                </li>
                            </ul>
                        </div>
                        <div className="botones w-6/12 flex items-center justify-around">
                            <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                            <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                        </div>
                        <span className=" absolute right-7 top-2 font-semibold text-gray-400">MECANICO</span>
                    </div>
                    <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                        <div className="information-request w-7/12">
                            <ul>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> BRUNO RAUL</p>

                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> CHIGNE MEDINA</p>
                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> 45 AÑOS</p>
                                </li>
                            </ul>
                        </div>
                        <div className="botones w-6/12 flex items-center justify-around">
                            <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                            <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                        </div>
                        <span className=" absolute right-7 top-2 font-semibold text-gray-400">MECANICO</span>
                    </div>
                    <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                        <div className="information-request w-7/12">
                            <ul>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> BRUNO RAUL</p>

                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> CHIGNE MEDINA</p>
                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> 45 AÑOS</p>
                                </li>
                            </ul>
                        </div>
                        <div className="botones w-6/12 flex items-center justify-around">
                            <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                            <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                        </div>
                        <span className=" absolute right-7 top-2 font-semibold text-gray-400">MECANICO</span>
                    </div>
                    <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                        <div className="information-request w-7/12">
                            <ul>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> BRUNO RAUL</p>

                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> CHIGNE MEDINA</p>
                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> 45 AÑOS</p>
                                </li>
                            </ul>
                        </div>
                        <div className="botones w-6/12 flex items-center justify-around">
                            <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                            <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                        </div>
                        <span className=" absolute right-7 top-2 font-semibold text-gray-400">MECANICO</span>
                    </div>
                    <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                        <div className="information-request w-7/12">
                            <ul>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> BRUNO RAUL</p>

                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> CHIGNE MEDINA</p>
                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> 45 AÑOS</p>
                                </li>
                            </ul>
                        </div>
                        <div className="botones w-6/12 flex items-center justify-around">
                            <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                            <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                        </div>
                        <span className=" absolute right-7 top-2 font-semibold text-gray-400">MECANICO</span>
                    </div>
                    <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                        <div className="information-request w-7/12">
                            <ul>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> BRUNO RAUL</p>

                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> CHIGNE MEDINA</p>
                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> 45 AÑOS</p>
                                </li>
                            </ul>
                        </div>
                        <div className="botones w-6/12 flex items-center justify-around">
                            <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                            <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                        </div>
                        <span className=" absolute right-7 top-2 font-semibold text-gray-400">MECANICO</span>
                    </div>
                    <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                        <div className="information-request w-7/12">
                            <ul>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> BRUNO RAUL</p>

                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> CHIGNE MEDINA</p>
                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> 45 AÑOS</p>
                                </li>
                            </ul>
                        </div>
                        <div className="botones w-6/12 flex items-center justify-around">
                            <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                            <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                        </div>
                        <span className=" absolute right-7 top-2 font-semibold text-gray-400">MECANICO</span>
                    </div>
                    <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                        <div className="information-request w-7/12">
                            <ul>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> BRUNO RAUL</p>

                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> CHIGNE MEDINA</p>
                                </li>
                                <li>
                                    <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> 45 AÑOS</p>
                                </li>
                            </ul>
                        </div>
                        <div className="botones w-6/12 flex items-center justify-around">
                            <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                            <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                        </div>
                        <span className=" absolute right-7 top-2 font-semibold text-gray-400">MECANICO</span>
                    </div>

                </div>
            </div>
        </LayaoutDashboard>

    );
}