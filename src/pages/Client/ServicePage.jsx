import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/service.css'
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
import TechnicalInformation from '../../components/Client/TechnicalInformation';
import { createServiceRequest } from '../../apis/Client/DirectRequest';
import { getUserInformation } from '../../apis/Client/UserApi';



export function ServicePage() {

    const { register: registerForm, handleSubmit, formState: {errors}, } = useForm() 

    //Guardamos el token para poder llenarla en cualquier peticion
    const accessToken = localStorage.getItem("access_token");
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));

    //estado para mostrar informacion del tecnico y variable que almacena al tecnico 
    const [loadInformation, setLoadInformation] = useState(true);
    const [renderTechnical, setRenderTechnical] = useState(true);
    const [technicalInformation, setTechnicalInformation] = useState({});
    const [categoryService, setCategoryService] = useState();

    //Load the Necesary Information in the form to look at or get the service(practicando mi ingles pipipi)
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
        clienteId: null,
    });

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        images: [],
    });

    const handleFormValuesUpdate = (updatedFormValues) => {
        setFormValues(updatedFormValues);
    };

    console.log('Datos del formulario:', formValues);




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



    const loadNewMap = handleSubmit(async (data) => {
        console.log("DATA NEW",data);
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


            console.log(dataApiProcedure, "xsadasd")

            //Cargando a todos los tecnicos 
            getTechnicallsByLocation(accessToken, dataApiProcedure.professionId, dataApiProcedure.availabilityId, dataApiProcedure.latitude, dataApiProcedure.longitude, dataApiProcedure.distance)
                .then(data => {
                    console.log("TECHNICALS",data.data.body);
                    const technicals = data.data.body;
                    setTechnicals(technicals)
                    technicals.forEach(element => {
                        if (dataApiProcedure.availabilityId == 1) {
                            const marker = new window.google.maps.Marker({
                                position: { lat: parseFloat(element.latitude), lng: parseFloat(element.longitude) },
                                map: map,
                            })
                        } else {
                            const marker = new window.google.maps.Marker({
                                position: { lat: parseFloat(element.professionAvailability.latitude), lng: parseFloat(element.professionAvailability.longitude) },
                                map: map,
                            })
                        }

                    })
                })


        } catch (error) {
            console.error("Error occurred while initializing map:", error);
        }
        console.log(formValues)
    });


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

            getUserInformation(decodedToken.sub, accessToken)
                .then(res => {
                    setDataApiProcedure({ ...dataApiProcedure, clienteId: res.data.body.id })
                })
        } catch (error) {

        }
            initializeMap();


    }, []); // The empty dependency ensures that this effect runs only once





    return (
        <LayaoutDashboard>
            <div className="container-all-service" >

                <div className="map-form  bg-white flex flex-row w-10/12 mx-auto mb-48 mt-24 rounded-2xl shadow-2xl">
                    <div className="w-7/12 h-full ">
                        <div className="bg-gray-100 rounded-l-2xl h-full w-full" id='map'>

                        </div>

                    </div>
                    <div className="w-6/12 	">
                        {/*-------------------- FORM -----------------------------*/}
                        <form onSubmit={loadNewMap}>
                            <div className="flex w-9/12 mb-3 mx-auto justify-between items-center">
                                <div className="title mx-auto w-9/12 h-5 mt-9 mb-12 text-2xl font-semibold">
                                    BUSCA A TU TECNICO
                                </div>
                                <div className='w-4/12 mt-5'>
                                    <select
                                        {...registerForm("distance",{required:true})}
                                        onChange={handleInputChangeApiProcedure}
                                        value={dataApiProcedure.distance || ''} 
                                        className="form-select-map w-full p-2 block border-gray-200 rounded-md text-base 	
                                focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                                        <option disabled value="">Rango</option>
                                        <option value="5">5 Kilometro</option>
                                        <option value="7">7 Kilometros</option>
                                        <option value="10">10 Kilometros</option>

                                    </select>
                                    {
                                        errors.distance && (
                                            <p className="text-red-500 text-xs">Rango requerido</p>
                                        )
                                    }
                                </div>

                            </div>
                            <div className='flex flex-col items-center gap-y-5 mb-3'>
                                <div className='w-9/12'>
                                    <select
                                        {...registerForm("professionId", {required: true})}
                                        onChange={handleInputChangeApiProcedure}
                                        value={dataApiProcedure.professionId|| ''} 
                                        className="form-select-map w-full py-3 px-4 pr-9 block border-gray-200 rounded-md text-base 	
                                    focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 ">
                                        <option disabled value="">Seleccione la Profession</option>
                                        {professions.map((opcion,index) => (
                                            <option key={index} value={opcion.id}>{opcion.name}</option>
                                        ))}
                                    </select>
                                    {
                                        errors.professionId && (
                                            <p className="text-red-500 text-xs">Seleccione una profesión</p>
                                        )
                                    }
                                </div>
                                <div className='w-9/12'>
                                    <select
                                        {...registerForm("categoryService", {required:true})}
                                        onChange={(event) => {
                                            setCategoryService(event.target.value)
                                        }}
                                        value={categoryService || ''} 
                                        className="form-select-map w-full py-3 px-4 pr-9 block border-gray-200 rounded-md text-base 	
                                    focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 ">
                                        <option disabled  value="">Seleccione la categoria</option>
                                        {categoryByService.map(opcion => (
                                            <option key={opcion.id} value={opcion.id}>{opcion.name} </option>
                                        ))}
                                    </select>
                                    {
                                        errors.categoryService && (
                                            <p className="text-red-500 text-xs">Seleccione una categoría</p>
                                        )
                                    }
                                </div>
                                <div className='w-9/12'>
                                    <select
                                        {...registerForm("availabilityId", {required:true})}
                                        onChange={handleInputChangeApiProcedure}
                                        value={dataApiProcedure.availabilityId || ''} 
                                        className="form-select-map w-full py-3 px-4 pr-9 block border-gray-200 rounded-md text-base 	
                                    focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5 ">
                                        <option disabled  value="">Disponibilidad del tecnico</option>
                                        {avalibalities.map((opcion,index) => (
                                            <option key={index} value={opcion.id}>{opcion.name}</option>
                                        ))}
                                    </select>
                                    {
                                        errors.availabilityId && (
                                            <p className="text-red-500 text-xs">Seleccione una disponibilidad</p>
                                        )
                                    }
                                </div>
                                            
                                <div className="w-9/12 flex justify-between">
                                    <div className='w-6/12'>
                                        <select
                                            {...registerForm("location", {required:true})}
                                            onChange={handleInputSelectLocation}
                                            className="form-select-map  py-3 px-4 block border-gray-200 rounded-md text-base w-full 
                                    focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 sm:p-5">
                                            <option disabled value="">Elige tu Ubicación</option>
                                            <option value="1">Mi ubicación</option>
                                            <option value="2">Otra Ubicación</option>
                                        </select>
                                        {
                                        errors.location && (
                                            <p className="text-red-500 text-xs">Seleccione una ubicación</p>
                                        )
                                    }
                                    </div>
                                    <Button
                                        style={{ height: '66px' }}
                                        className='bg-blue-400 text-4xl w-5/12 '
                                        onClick={() => setIsOpenModal(true)}>DETALLA TU PROBLEMA</Button>
                                    {isOpenModal && <DirectRequestModal
                                        onCloseModal={() => setIsOpenModal(false)}
                                        isOpen={isOpenModal}
                                        onUpdateFormValues={handleFormValuesUpdate}
                                    />}
                                </div>
                            </div>



                            <button className="boton_buscar block w-9/12 font-bold	 text-2xl p-3 mx-auto rounded-md">BUSCAR
                                ESPECIALISTAS</button>
                        </form>
                        {/*-------------------- END FORM -----------------------------*/}
                    </div>
                </div>


                <div className="container flex mx-auto justify-around w-11/12">
                    {loadInformation ? (<h1>Cargando</h1>) : (<TechnicalInformation 
                     formData={{professionAvailabilityId: technicalInformation.professionAvailabilityId,
                        clientId: dataApiProcedure.clienteId,
                        serviceTypeAvailabilityId: null,
                        categoryServiceId:categoryService,
                        latitude: dataApiProcedure.latitude,
                        longitude: dataApiProcedure.longitude,
                        title: formValues.title,
                        description: formValues.description,
                        imageUrls: formValues.images}}
                      technical_id={technicalInformation.technical_id} profession={technicalInformation.profession} name={technicalInformation.name} lastnames={technicalInformation.lastnames} birthDate={technicalInformation.birthDate} categoryServiceId={categoryService} />)}

                    <div className="listadoespecialistas w-4/12 overflow-y-scroll	">


                        {technicals.map((opcion,key) => (
                            <TechnicalDiv key={key} name={opcion.name} lastnames={`${opcion.lastname} ${opcion.motherLastname}`} birthDate={opcion.birthDate} 
                            
                            btnVer={() => {
                                const info = {
                                    professionAvailabilityId: opcion.professionAvailability.id,
                                    technical_id: opcion.id,
                                    name: opcion.name,
                                    lastnames: opcion.lastname + " " + opcion.motherLastname, birthDate: opcion.birthDate,
                                    profession: opcion.professionAvailability.profession
                                };
                                setTechnicalInformation(info)
                                setLoadInformation(false)
                                setRenderTechnical(!renderTechnical)
                            }}

                                btnRequestSolitude={() => {
                                    const accessToken = localStorage.getItem("access_token");


                                    const requestData = {
                                        professionAvailabilityId: opcion.professionAvailability.id,
                                        clientId: dataApiProcedure.clienteId,
                                        serviceTypeAvailabilityId: null,
                                        categoryServiceId: categoryService,
                                        latitude: dataApiProcedure.latitude,
                                        longitude: dataApiProcedure.longitude,
                                        title: formValues.title,
                                        description: formValues.description,
                                        imageUrls: formValues.images
                                    }
                                    createServiceRequest(requestData, accessToken)
                                }} />



                        ))}



                    </div>
                </div>
            </div>

        </LayaoutDashboard>

    );
}