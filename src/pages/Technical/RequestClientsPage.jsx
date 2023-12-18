import React, { useEffect, useState } from 'react'
import { LayaoutDashboard } from '../../components/LayaoutDashboard'
import { getUserInformation } from '../../apis/Client/UserApi';
import { updateTechnicalUbication, updateWorkingStatus } from '../../apis/Client/TechnicalsApi';
import { getUserLocation } from '../../assets/js/userLocation';
import '../../assets/css/requestClient.css'
import ClientPetition from '../../components/Technical/ClientPetition';
import DropDownStateRequest from '../../components/Technical/DropDownStateRequest';
import { MapComponentTechnical } from '../../components/Technical/MapComponentTechnical';
import toast, { Toaster } from 'react-hot-toast';

export default function RequestClientsPage() {
  const token = window.localStorage.getItem("access_token");
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const role = decodedToken.roleId;
    if(role==1){
        Navigate('/buscar-tecnico')
    }        
    else if(role==3){
        Navigate('/solicitudes-recibidas')
    }
    

  const [renderComponenet, setRenderComponent] = useState(true);
  const [viewUbicateMap, setViewUbicateMap] = useState({
    lat: null,
    lng: null
  });

  const [workingStatus, setWorkingStatus] = useState(false);
  const [technicalId, setTechnicalId] = useState();
  const [requestClients, setRequestClients] = useState([]);

  const messageStateWorking = workingStatus ? "DEJAR DE TRABAJAR" : "EMPEZAR A TRABAJAR"


  const changeStateWorking = () => {
    const accessToken = window.localStorage.getItem("access_token");
    const data = {
      "stateId": !workingStatus ? 1 : 0
    }
    updateWorkingStatus(accessToken, technicalId, data)
      .then(res => setRenderComponent(!renderComponenet))
  }


  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));

    getUserInformation(decodedToken.sub, accessToken)
      .then(res => {
        const statusWorking = res.data.body.statusWorking;

        setWorkingStatus(statusWorking == 1 ? true : false)
        setTechnicalId(res.data.body.id)
      })


  }, [renderComponenet])

  useEffect(() => {
    if (!workingStatus) {
      return;
    }
    const accessToken = localStorage.getItem("access_token");
    getUserLocation()
          .then((data) => {
            updateTechnicalUbication(accessToken, { latitude: data.lat, longitude: data.lng }, technicalId);
          })
          .catch((error) => {
            console.error('Error al obtener la ubicación:', error);
          });


    const intervalId = setInterval(() => {
      const accessToken = localStorage.getItem("access_token");

      // Verificar si technicalId está definido
      if (technicalId) {
        getUserLocation()
          .then((data) => {
            updateTechnicalUbication(accessToken, { latitude: data.lat, longitude: data.lng }, technicalId);
          })
          .catch((error) => {
            console.error('Error al obtener la ubicación:', error);
          });
      }
    }, 15000);

    // Limpieza del intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [technicalId, workingStatus,renderComponenet]); // Agregar technicalId como dependencia

  console.log(workingStatus)
  return (
    <LayaoutDashboard>
      <Toaster/>
      <div className="grid place-content-center px-20">
        <div className=''>
          <h1 className="text-2xl font-semibold py-4">Solicitudes entrantes</h1>
          <div className="flex flex-row  gap-x-5" style={{ maxHeight: '880px', maxWidth: '1400px' }}>
            <div className="w-8/12 py-5 bg-white shadow-personalized rounded-2xl px-1">
              <p className="text-sm mb-2 px-5">Al pulsar este botón, otros usuarios podrán visualizar tu ubicación cuando requieran de tus servicios Al pulsar este botón, otros usuarios podrán visualizar tu ubicación cuando requieran de tus servicios</p>
              {workingStatus ? <ClientPetition renderComponent={()=>{
                setRenderComponent(!renderComponenet)
              }} setUbication={(data) => {
                setViewUbicateMap(data)
              }} technicalId={technicalId} requestClients={requestClients} changeRequests={(data) => {
                setRequestClients(data)
              }} /> : ""}
            </div>


            <div id="lateral" className="w-4/12 flex flex-col gap-y-7 justify-between">
              <div id="comenzar-trabajar" className="flex flex-row shadow-personalized bg-white rounded-2xl p-4 gap-x-3">
                <div>
                  <h5 className="font-medium text-lg">Comenzar a trabajar</h5>
                  <p className="text-xs">Al pulsar este botón, otros usuarios podrán visualizar tu ubicación cuando requieran de tus servicios</p>
                </div>
                <div id="button-working-status" className="flex flex-col justify-center">
                  {

                    workingStatus ? (

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input onClick={changeStateWorking} type="checkbox" value="" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>

                      </label>
                    ) : (<label className="relative inline-flex items-center me-5 cursor-pointer mr-0">
                      <input onClick={changeStateWorking}
                        type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-amber-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>

                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>)
                  }



                </div>
              </div>
              <div id="tipo-solicitud" className="flex justify-center items-center shadow-personalized bg-white rounded-2xl h-20">
                <DropDownStateRequest setUbication={(data) => {
                  setViewUbicateMap(data)
                }} technicalId={technicalId} changeRequests={(data) => {
                  setRequestClients(data)
                }} />
              </div>
              <div className="flex flex-col justify-center shadow-personalized bg-white rounded-2xl p-4">
                <p className="text-sm">Este mapa te facilitará encontrar rápidamente la ubicación de cualquier solicitud que te hayan hecho.</p>
                <div className='w-full' style={{ height: '30rem' }}>
                  {workingStatus ? (<>
                    <MapComponentTechnical posibleLocation={
                      {
                        lat: viewUbicateMap.lat,
                        lng: viewUbicateMap.lng,
                      }

                    } />

                  </>) : ""}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayaoutDashboard>
  )
}
