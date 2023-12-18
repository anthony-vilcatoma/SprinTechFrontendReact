import React, { useEffect, useState } from 'react'
import { Modal } from 'flowbite-react';
import { getAllReviews } from '../../apis/Client/Review';
import ReviewOnePerson from './ReviewOnePerson';
import { Carousel } from 'flowbite-react';

export default function ComentariesModal({ onClose ,technicalId}) {
    const [allReviews,setReviews] = useState([]);
    useEffect(()=>{
        const access_token = window.localStorage.getItem("access_token")
        getAllReviews(access_token,technicalId)
        .then(res=>setReviews(res.data.body))
    },[])
    return (
        <Modal show={true} onClose={open} size={"md"} style={{ fontFamily: 'Urbanist, sans-serif' }}>
            <Modal.Body className="relative flex flex-col justify-center items-center">
                <button className="absolute top-5 right-5"><i className='bx bxs-x-circle text-3xl' onClick={onClose} ></i></button>
                <h1 className="font-bold text-xl mx-auto text-center mb-5">Deja una Reseña</h1>
                <Carousel slide={false}>
                {
                    allReviews.map((e,index)=><ReviewOnePerson e={e}/>)
                }

                </Carousel>




            </Modal.Body>


        </Modal>


    )
}
