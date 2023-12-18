import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite-react';
import { createReview } from '../../apis/Client/Review';

export default function ReseñaModal({ open, onClose,directRequest,cancel,showIsPending,showInProcess }) {
    const technicalId= directRequest.professionAvailability.technical.id;
    const clientId = directRequest.clientId;
    const handleRatingChange = (value) => {
      setFormData({...formData,numberStars:value});
    };
  
    const [formData, setFormData] = useState({
        technicalId: technicalId,
        clientId: clientId,
        title: "",
        comment: "",
        numberStars: ""
    });

    console.log(formData)
    const onChangeFormData = (event) => {
        const {name,value} = event.target
        setFormData({...formData,[name]:value})
    }

    const submitReview = () =>{
        const access_token = window.localStorage.getItem("access_token")
        cancel();
        onClose();
        createReview(access_token,formData)
        .then(res=>showInProcess())
    }

    return (
        <Modal show={true} onClose={open} size={"md"} style={{ fontFamily: 'Urbanist, sans-serif' }}>
            <Modal.Body className="relative flex flex-col justify-center items-center">
                <button className="absolute top-5 right-5"><i className='bx bxs-x-circle text-3xl' onClick={onClose} ></i></button>
                <h1 className="font-bold text-xl mx-auto text-center mb-5">Deja una Reseña</h1>
                <div className=" bg-gray-50 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-11/12">
                    <div className="flex flex-col ">
                        <div className="text-gray-600 ">

                            <div className="container-person mb-5  flex items-center justify-evenly">
                                <img className="object-cover w-32 h-32 rounded-full"
                                    alt="" />

                            </div>
                            <p className='text-center font-semibold mb-5'>Anthony Vilcatoma Palacios</p>
                        </div>
                    </div>
                </div>

                <div className="mt-7 bg-gray-50 p-5 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-11/12">
                    <div className="mb-4">
                        <p className="">Deja una puntuación</p>
                        {/* Star rating system */}
                        <fieldset className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <React.Fragment key={value}>
                                    <input
                                        type="radio"
                                        id={`star${value}`}
                                        name="rating"
                                        value={value}
                                        className="hidden"
                                        onChange={() => handleRatingChange(value)}
                                    />
                                    <label
                                        htmlFor={`star${value}`}
                                        className={`text-xl cursor-pointer ${value <= formData.numberStars ? 'text-yellow-500' : ''
                                            }`}
                                    >
                                        &#9733;
                                    </label>
                                </React.Fragment>
                            ))}
                        </fieldset>
                    </div>

                    <div className="mb-4">
                        <p className="">Resume tu experiencia en una palabra</p>
                        <input type="text" name='title' onChange={onChangeFormData} className="mt-1 p-2 border-none bg-gray-200 rounded-md w-full" />
                    </div>

                    <div>
                        <p className="">Comparte tu opinión</p>
                        <textarea name='comment' onChange={onChangeFormData} className="mt-1 p-2 border-none bg-gray-200 rounded-md w-full" rows="3"></textarea>
                    </div>
                </div>
                
                <div className="flex mt-5">
                <button className='p-2 rounded-lg mr-5 font-semibold text-white bg-gray-400'>Cancelar</button>
                <button className='p-2 rounded-lg font-semibold bg-personalized text-white ' onClick={submitReview} >Concluir</button>



                </div>





            </Modal.Body>


        </Modal>


    )
}
