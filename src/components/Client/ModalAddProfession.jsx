import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite-react';
import { getExperiences } from '../../apis/Client/ExperienceApi';
import { data } from 'autoprefixer';
import { createProfession, getProfessions } from '../../apis/Client/ProfessionApi';
import { getAvailabilities } from '../../apis/Client/AvailavilityApi';
import { MapComponent } from './MapComponenet';
import { Navigate } from 'react-router-dom';

export default function ModalAddProfession({ open, close, reloadComponent,professionsExistAlready,technicalId}) {

    const [professions, setProfessions] = useState([]);
    const [availabilities, setAvailabilites] = useState([]);
    const [experiences, setExperiences] = useState([]);

    const [formData, setFormData] = useState({
        technicalId:technicalId,
        professionId: null,
        availabilityId: null,
        experienceId: null,
        latitude: null,
        longitude: null
    });

    //AQUI ALMACENO LAS PROFESSIONES QUE YA TIENE EL USUARIO
    const professionsHasUser = [];
    professionsExistAlready.forEach(element => {
       professionsHasUser.push(element.profession.name)
    });

    //Aqui filtro e unifico esas profesiones
    const arraySinDuplicados = [...new Set(professionsHasUser)];

    //professionsSHOW SON LAS PROFESIONES QUE TENDRA COMO OPCION EL TECNICO, es decir las que no tiene!
    const professionsShow = professions.filter(element => {
        return !arraySinDuplicados.includes(element.name);
      }).map(element => element);


    

      // un evento representa todo cambio en html(input,click etc)
    //event contiene información sobre el evento, como el tipo de evento (cambio, clic, etc.)
    const handleInputChange = (event) => {
        //event.target para acceder a las propiedades y valores específicos del elemento que causó el evento.
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const submitForm = () => {
        const token = window.localStorage.getItem("access_token")
        try {
            if (formData.availabilityId == 1) {
                createProfession(token, {
                    professionId: formData.professionId,
                    availabilityId: formData.availabilityId,
                    experienceId: formData.experienceId,
                }, technicalId)
                    .then(data => {
                        close()
                        reloadComponent()
                    })
            }

            if (formData.availabilityId == 2) {
                createProfession(token, formData, technicalId)
                    .then(data => {
                        close()
                        reloadComponent()
                    })
            }

            if (formData.availabilityId == 'ambas') {
                createProfession(token, {
                    professionId: formData.professionId,
                    availabilityId: 1,
                    experienceId: formData.experienceId,
                }, technicalId)

                createProfession(token, {
                    professionId: formData.professionId,
                    availabilityId: 2,
                    experienceId: formData.experienceId,
                    latitude: formData.latitude,
                    longitude: formData.longitude
                }, technicalId)
                    .then(data => {
                        close()
                        reloadComponent()
                    })
            }


        } catch (error) {

        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem("access_token")

        try {
            getExperiences(token)
                .then(res => {
                    setExperiences(res.data.body)
                })

            getProfessions(token)
                .then(res => {
                    setProfessions(res.data.body)
                })

            getAvailabilities(token)
                .then(res => {
                    setAvailabilites(res.data.body)
                })
        } catch (error) {
            console.log(error)
        }

    }, [])
    return (
        <Modal show={true} onClose={open}  size={"md"} style={{ fontFamily: 'Urbanist, sans-serif' }}>
            <Modal.Body className='w-fit mx-auto'>
                <button className="absolute top-5 right-5"><i className='bx bxs-x-circle text-3xl' onClick={close} ></i></button>
                <h1 className="font-bold text-xl mx-auto text-center mb-5">Agregar Professión</h1>

                <div className="flex justify-between items-center">
                    <div className="">

                        <select onChange={handleInputChange}
                            name='professionId'
                            value={formData.professionId || 'selected'} // Usa value en lugar de selected
                            className=" bg-gray-200 text-gray-600 block mx-auto mb-5 p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                            <option disabled value="selected">Seleccione su profession</option>
                            {professionsShow.map(element=>
                                <option key={element.id} value={element.id}>{element.name}</option>)}

                        </select>


                        <select onChange={handleInputChange}
                            name='experienceId'
                            value={formData.experienceId || 'selected'} // Usa value en lugar de selected

                            className="   bg-gray-200  text-gray-600 mb-5 p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                            <option disabled value="selected">Seleccione la experiencia</option>
                            {experiences.map(element => (<option key={element.id} value={element.id} >{element.name}</option>))}

                        </select>

                        <select onChange={handleInputChange}
                            value={formData.availabilityId|| 'selected'} // Usa value en lugar de selected
                            name='availabilityId'
                            className="   bg-gray-200  text-gray-600 mb-5 p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                            <option disabled  value="selected">Seleccione su disponibilidad</option>
                            {availabilities.map(element => (<option key={element.id} value={element.id} >{element.name}</option>))}
                            <option value="ambas">Ambas Modalidades</option>



                        </select>

                        <button className="bg-orange-personalized p-2 px-4 w-full rounded-md text-white" onClick={submitForm}>¡Registrar!</button>
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
