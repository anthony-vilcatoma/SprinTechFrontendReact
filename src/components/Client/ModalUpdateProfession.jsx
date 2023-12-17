import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite-react';
import { getExperiences } from '../../apis/Client/ExperienceApi';
import { getAvailabilities } from '../../apis/Client/AvailavilityApi';
import { MapComponent } from './MapComponenet';
import { createProfession, deleteProfessionAvailabilityById, getAllProfessionByTechnical, getProfessionByAvailabilityFromId, getProfessionsAvaialbilitiesByTechnicalIdAndProfessionId, updateProfessionByAvailability } from '../../apis/Client/ProfessionApi';
import { getUserInformation } from '../../apis/Client/UserApi';

export default function ModalUpdateProfession({ tecnicoId,open, close, reloadComponent,professionAvailabilityId}) {
    const [stateWidth,setStateWidth] = useState(true);
    const sizeModal = stateWidth ? "sm" : "2xl"

    const [availabilities, setAvailabilites] = useState([]);
    const [experiences, setExperiences] = useState([]);
    
    const [profession,setProfession] = useState({});

    const [professionTechnic,setProfessionTechnic] = useState([]);

    const [formData, setFormData] = useState({
        professionId: null,
        availabilityId: null,
        experienceId: null,
        latitude: null,
        longitude: null
    });

    //aqui almacenaremos el professionAvailability que queremos modificar pero solo servira para verificar cual fue el availabilityOriginal
    const [ProfessionAvailabilityData,setProfessionAvailabilityData] = useState({
        professionId: null,
        availabilityId: null,
        experienceId: null,
        latitude: null,
        longitude: null
    });



    const filteredArray = professionTechnic.filter(obj => obj.profession.id == formData.professionId);
    //verifico si tiene 2 registros de de profeesion_availability es decir tiene taller y al cliente!
    const verifyIsBoth = filteredArray.length==2? true : false;
    
    const handleInputChange = (event) => {
        //event.target para acceder a las propiedades y valores específicos del elemento que causó el evento.
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if(name=="availabilityId" && value==2 || value=="ambas"){
            setStateWidth(false);
        }
        if(name=="availabilityId" && value==1){
            setStateWidth(true);
        }
    };


    const submitForm = async() => {
        const token = window.localStorage.getItem("access_token")
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        
        try {

            //Si availability es a domicilio
            if (formData.availabilityId == 1) {
                //verifica si se cambio de ambos a domicilio
                if(verifyIsBoth){
                    // elimina el de taller
                    let idTaller ;
                    let idDomicilio;
                    const res = await getProfessionsAvaialbilitiesByTechnicalIdAndProfessionId(token,tecnicoId,ProfessionAvailabilityData.professionId)
                    const data = res.data.body;
                    data.forEach(e=>{
                        if(e.availability.id==2){
                            return idTaller=e.id;
                        }
                        return idDomicilio=e.id;
                
                    })
                    await deleteProfessionAvailabilityById(token,idTaller);


                    //actualiza el registro de solo a domicilio que ya existia
                    await updateProfessionByAvailability(token,{
                        professionId: formData.professionId,
                        availabilityId: 1,
                        experienceId: formData.experienceId
                    }, idDomicilio)
                    close();
                    reloadComponent();
                }else{
                    //se cambio de taller a domicilio o se mantuvo
                    updateProfessionByAvailability  (token, {
                        professionId: formData.professionId,
                        availabilityId: formData.availabilityId,
                        experienceId: formData.experienceId,
                    }, professionAvailabilityId)
                        .then(data => {
                            close()
                            reloadComponent()
                        })
                }

                
               
            }

            if (formData.availabilityId == 2) {

                //verifica si se cambio de ambos a taller
                if(verifyIsBoth){

                    // elimina el de domicilio
                    let idTaller ;
                    let idDomicilio;
                    const res = await getProfessionsAvaialbilitiesByTechnicalIdAndProfessionId(token,tecnicoId,ProfessionAvailabilityData.professionId)
                    const data = res.data.body;
                    data.forEach(e=>{
                        if(e.availability.id==2){
                            return idTaller=e.id;
                        }
                        return idDomicilio=e.id;
                
                    })
                    await deleteProfessionAvailabilityById(token,idDomicilio);


                    //actualiza el registro de "taller"que ya existia
                    await updateProfessionByAvailability(token,{
                        professionId: formData.professionId,
                        availabilityId: 2,
                        experienceId: formData.experienceId,
                        latitude: formData.latitude,
                        longitude: formData.longitude
                    }, idTaller)

                    close();
                    reloadComponent();

                }else{
                    updateProfessionByAvailability (token, formData,professionAvailabilityId)
                    .then(data => {
                        close()
                        reloadComponent()
                    })
                }
                
                
               
            }

            if (formData.availabilityId == 'ambas') {
                
                //Verifica si en realidad no se cambio el availability
                if(verifyIsBoth){
                    
                    console.log("sigue igual")
                } 
                // Si quiere actualizar de "a domicilio" a ambos                
                else if (ProfessionAvailabilityData.availabilityId==1) {
                    //actualizamos el registro de " a domicilio"
                    updateProfessionByAvailability  (token, {
                        technicalId:tecnicoId,
                        professionId: formData.professionId,
                        availabilityId: 1,
                        experienceId: formData.experienceId,
                    }, professionAvailabilityId)

                    //añade un nuevo registro para local
                    createProfession(token, {
                        technicalId:tecnicoId,
                        professionId: formData.professionId,
                        availabilityId: 2,
                        experienceId: formData.experienceId,
                        latitude: formData.latitude,
                        longitude: formData.longitude
                    }, tecnicoId).then(data=>{
                        close()
                        reloadComponent()
                    })
                    console.log("de 'a domicilio' a ambos")
                    
                }
                //si quiere actualizar de un taller a ambos
                else if(ProfessionAvailabilityData.availabilityId==2){
                    //actualizamos la informacion de taller par que se igual al que vamos a crear del otro tipo
                    updateProfessionByAvailability(token, {
                        technicalId:tecnicoId,
                        professionId: formData.professionId,
                        availabilityId: 2,
                        experienceId: formData.experienceId,
                        latitude: formData.latitude,
                        longitude: formData.longitude
                    }, professionAvailabilityId)
                    console.log("de taller a ambos")


                    //creamos un nuevo registro con availability "a domicilio"
                    createProfession(token, {
                        technicalId:tecnicoId,
                        professionId: formData.professionId,
                        availabilityId: 1,
                        experienceId: formData.experienceId
                    }, tecnicoId).then(data=>{
                        close()
                        reloadComponent()
                    })

               }
            }


        } catch (error) {

        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem("access_token")
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        try {
            getExperiences(token)
                .then(res => {
                    setExperiences(res.data.body)
                })

            getAvailabilities(token)
                .then(res => {
                    setAvailabilites(res.data.body)
                })

            getProfessionByAvailabilityFromId(token,professionAvailabilityId)
            .then(res=>{
                //Pinto todos los datos del ProfessionAvailability por su id principal
                const data = res.data.body
                
                setFormData({...formData,
                //la profession de ese registro de profession availability
                professionId:data.profession.id,
                availabilityId:data.availability.id,
                experienceId:data.experience.id,
                latitude: data.latitude ?  data.latitude : null,
                longitude: data.longitude ?  data.longitude : null,
                })

                setProfessionAvailabilityData({...ProfessionAvailabilityData,
                    //la profession de ese registro de profession availability
                    professionId:data.profession.id,
                    availabilityId:data.availability.id,
                    experienceId:data.experience.id,
                    latitude: data.latitude ?  data.latitude : null,
                    longitude: data.longitude ?  data.longitude : null,})
                setProfession(data.profession)


            getAllProfessionByTechnical(token,decodedToken.sub)
            .then(res=>
                //envio todos las professiones con sus disponibilidades que tiene el tecnico
                setProfessionTechnic(res.data.body))

            })
        } catch (error) {
            console.log(error)
        }

    }, [])
    return (
        <Modal show={true} onClose={open} size={sizeModal} style={{ fontFamily: 'Urbanist, sans-serif' }}>
            <Modal.Body className="relative flex flex-col justify-center items-center">
                <button className="absolute top-5 right-5"><i class='bx bxs-x-circle text-3xl' onClick={close} ></i></button>
                <h1 className="font-bold text-xl mx-auto text-center mb-5">Editar Professión</h1>

                <div className="flex justify-between items-center">
                    <div className="">
                        <label className='text-base font-bold mb-1 block'>Profession</label>
                        <select onChange={handleInputChange}
                            name='professionId'
                            className=" bg-gray-200 text-gray-600 block mx-auto mb-5 p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                            <option selected  value={profession.id}>{profession.name}</option>
                        </select>

                        <label className='text-base font-bold mb-1 block'>Experiencia</label>
                        <select onChange={handleInputChange}
                            name='experienceId'
                            className="   bg-gray-200  text-gray-600 mb-5 p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                            <option disabled selected value>Seleccione la experiencia</option>
                            {experiences.map(element => 
                                    element.id==formData.experienceId ? <option key={element.id} selected value={element.id} >{element.name}</option> 
                                    : <option key={element.id} value={element.id} >{element.name}</option>
                            )}

                        </select>

                    
                        <label className='text-base font-bold mb-1 block'>Disponibilidad</label>
                        <select onChange={handleInputChange}
                            name='availabilityId'
                            className="   bg-gray-200  text-gray-600 mb-5 p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                            <option disabled selected value>Seleccione su disponibilidad</option>
                            {availabilities.map(element => 
                                element.id == formData.availabilityId ? <option key={element.id} selected value={element.id} >{element.name}</option> 
                                : <option key={element.id} value={element.id} >{element.name}</option>
                            )}
                            {verifyIsBoth?  <option value="ambas" selected>Ambas Modalidades</option> :  <option value="ambas">Ambas Modalidades</option> }



                        </select>

                        <button className="bg-orange-personalized p-2 px-4 w-full rounded-md text-white" onClick={submitForm}>¡Actualizar!</button>
                    </div>

                    {formData.availabilityId === '2' || formData.availabilityId === 'ambas' ?
                        <div className="ml-10 w-96	 h-60">
                            <MapComponent setUbication={(lat, lng) => {
                                setFormData({
                                    ...formData,
                                    latitude: lat,
                                    longitude: lng
                                })
                            }} />

                        </div> : (formData.latitude = null, formData.longitude = null)
                    }

                </div>






            </Modal.Body>


        </Modal>


    )
}
