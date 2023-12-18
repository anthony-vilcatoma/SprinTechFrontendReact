import { Modal } from 'flowbite-react';
import { MapComponentTechnical } from './MapComponentTechnical';

export function ModalMap({ onClose, posibleLocation,type  }) {


  return (
    <>
      <Modal show={true} onClose={onClose} size="3xl" style={{ fontFamily: 'Urbanist, sans-serif' }} className='h-fit'>
        <Modal.Body className=" ">
          <button className="absolute top-0 right-0"><i class=' bx bxs-x-circle text-3xl' onClick={onClose} ></i></button>
          <h1 className='text-center font-semibold text-xl mb-5'>Ubicación en tiempo real del tecnico</h1>
          <div className="w-100 h-96 ">
            <MapComponentTechnical type={type} posibleLocation={posibleLocation}/>
          </div>


        </Modal.Body >

      </Modal >
    </>
  );
}
