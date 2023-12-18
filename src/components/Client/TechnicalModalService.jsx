import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite-react';
import { getCategoriesByService, getProfessionsAvaialbilitiesByTechnicalIdAndProfessionId } from '../../apis/Client/ProfessionApi';
import { createServicebyProfession } from '../../apis/Client/ServiceProfession';

export default function TechnicalModalService({ open, close, professionId,render,technicalId}) {
    const token = window.localStorage.getItem("access_token")
    const [categoriesService, setCategoriesService] = useState([]);
    const [availabilitiesOption,setAvailabilitesOptions] = useState([]);

    console.log(availabilitiesOption)
    const [formData, setFormData] = useState({
        technicalId: technicalId,
        professionAvailabilityId:null,
        categoryServiceId: null,
        currencyTypeId: 1,
        name: null,
        description: null,
        price: null,
        file: null,
    })
    console.log(formData);
    useEffect(() => {
        getProfessionsAvaialbilitiesByTechnicalIdAndProfessionId(token,technicalId,professionId)
        .then(res=>setAvailabilitesOptions(res.data.body))

        getCategoriesByService(token)
            .then(res => {
                setCategoriesService(res.data.body);
            })
    }, [])


    const submitForm = (event) => {
        event.preventDefault();
        createServicebyProfession(token, formData)
            .then(res => {
                console.log(res.data.body)
                close();
                render();
            })
            .catch(error => {
                console.log("Error",error);
            });
    }

    const handleInputChange = (event) => {
        //event.target para acceder a las propiedades y valores específicos del elemento que causó el evento.
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    //Funcion para añadir una o mas imagenes y almacenarlas en el files del estado FormData
    const handleImageChange = (event) => {
        const file = event.target.files; // Obtener todos los archivos seleccionados
        setFormData({ ...formData, file: file }); // Agregar archivos al estado formData
    };


    //funcion que se encarga de eliminar la imagen que deseamos quitar del array de files mediante su indice.
    const removeImage = () => {
        setFormData({ ...formData, file: null })
        const fileInput = document.getElementById('fileInput'); // Agrega un ID al input de tipo file
        if (fileInput) {
            fileInput.value = ''; // Resetea manualmente el valor del input
        }
    };
    return (
        <Modal show={true} onClose={open} size="4xl" style={{ fontFamily: 'Urbanist, sans-serif' }}>
            <Modal.Body className="px-10 relative">
                <button className="absolute top-5 right-5"><i className='bx bxs-x-circle text-3xl' onClick={close} ></i></button>
                <h1 className="font-bold text-2xl mx-auto text-center mb-5">Detalles de su servicio</h1>

                <form className="flex" onSubmit={submitForm}>
                    <div className="form-service-detail w-6/12 h-fit	 mr-5">
                        <label htmlFor="">Ingrese nombre de su servicio</label>
                        <input required onChange={handleInputChange} type="text" name="name"
                            className="  mb-5 p-2 block w-full border-gray-200 bg-gray-200 rounded-md text-base 	
                                                                focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 "
                        />

                        <label htmlFor="">Ingrese descripción de su servicio</label>
                        <textarea required name="description" onChange={handleInputChange} className="h-32 resize-none bg-gray-200  p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 mb-5 dark:border-gray-700 dark:text-gray-400 "
                            id="" cols="30" rows="10"></textarea>



                        <label htmlFor="">Seleccione la Categoria</label>
                        <select required onChange={handleInputChange}
                            value={formData.categoryServiceId || 'default'}
                            name='categoryServiceId'
                            className="   bg-gray-200 mb-5 p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                            <option disabled value="default">Categoria</option>
                            {
                                categoriesService.map((e,index) => <option key={index} value={e.id}>{e.name}</option>)
                            }
                        </select>

                        <div className="flex w-full">
                            <div className="block w-6/12">
                                <label htmlFor="">Precio del servicio</label>
                                <div className="flex  w-6/12">
                                    <select 
                                        className=" bg-gray-200 w-16 mr-3 mb-5 p-2 block  border-gray-200 rounded-md text-base 	
                                focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                                        <option disabled value>S/</option>
                                        <option value="5">$</option>
                                        <option value="7"></option>
                                        <option value="10">10 Kilometros</option>
                                    </select>
                                    <input required type="text" onChange={handleInputChange}
                                        placeholder="price"
                                        name='price'
                                        className="bg-gray-200 p-2 block  w-24 border-gray-200 rounded-md text-base   focus:border-blue-500 mb-5 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 "
                                    />
                                </div>
                            </div>
                            <div className="w-6/12">
                                <label htmlFor="">Disponibilidad</label>
                                <div className="flex">
                                    <select required onChange={handleInputChange}
                                        value={formData.professionAvailabilityId|| 'default'}
                                        name='professionAvailabilityId'
                                        className=" bg-gray-200  mb-5 p-2 block w-full border-gray-200 rounded-md text-base 	
                            focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400   ">
                                        <option disabled value="default">Disponibilidad</option>
                                        {
                                            availabilitiesOption.map((e,index) => <option key={index} value={e.id}>{e.availability.name}</option>
                                            )
                                        }

                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="upload-img  flex flex-col w-6/12 ml-3 mt-4">
                        <div className="w-full flex flex-wrap gap-2 mb-5">
                            {

                                formData.file == null ? "" : (
                                <div className="relative w-full">
                                <img
                                  className="object-cover rounded-lg w-full h-64"
                                  src={URL.createObjectURL(formData.file[0])} // Usar 'formData.file' en lugar de 'FormData.file'
                                  alt=""
                                />
                                <button
                                  onClick={() => removeImage()}
                                  className="absolute top-1 right-1 bg-red-500 rounded-full text-white w-6 h-6 flex items-center justify-center"
                                >
                                  X
                                </button>
                              </div>)}
                        </div>

                        <div className="">
                            <input id='fileInput'
                                type="file"
                                required
                                accept="image/*"
                                className="bg-gray-300 block mx-auto rounded-md w-full mb-8"
                                onChange={handleImageChange}
                                // Agregar el atributo 'multiple' para evitar la selección de múltiples archivos
                                // Esto asegura que solo se pueda seleccionar un archivo a la vez
                                multiple={false}
                            />


                            <button type='submit' className="bg-[#CB7930] rounded-lg text-white w-full h-12 mx-auto">
                                Registrar Servicio
                            </button>
                        </div>
                    </div>
                </form>



            </Modal.Body>


        </Modal>



    );
}
