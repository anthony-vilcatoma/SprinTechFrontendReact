import { Modal } from 'flowbite-react';
import { Carousel } from 'flowbite-react';

export function ModalInformationProblem({ onClose, directRequest }) {
    console.log("Imprimiendo modal")
    let fechaActual = new Date(directRequest.createdAt);
    let opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    let fechaEnEspañol = fechaActual.toLocaleString('es-PE', opciones);

    var images = directRequest.files;
    console.log(directRequest)
    return (
        <>
            <Modal show={true} onClose={onClose} size="5xl" style={{ fontFamily: 'Urbanist, sans-serif' }} className='h-fit'>
                <Modal.Body className="py-5 px-10 relative ">
                    <button className="absolute top-5 right-5"><i className=' bx bxs-x-circle text-3xl' onClick={onClose} ></i></button>
                    <div className="flex">
                        <div className="flex-col w-5/12">
                            <div className=" bg-gray-50 rounded-xl shadow-2xl p-4 px-4 md:p-8 mb-6">
                                <div className="flex flex-col ">



                                    <div className="text-gray-600 ">
                                        <p className="font-bold text-xl text-center mb-5">Información Tecnico</p>

                                        <div className="container-person mb-5  flex items-center justify-evenly">
                                            <img className="object-cover w-32 h-32 rounded-full"
                                                src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" />

                                        </div>
                                        <p className='text-center font-semibold'>Anthony Vilcatoma Palacios</p>
                                    </div>
                                </div>
                            </div>

                            <div className=" bg-gray-50 rounded-xl shadow-2xl p-2  mb-6">
                                <div className="flex flex-col ">



                                    <div className="text-gray-600">
                                        <p className="font-bold text-lg text-center mb-2">Imagenes del Problema</p>

                                        <div className="container-person mb-2  flex items-center justify-evenly">
                                            <Carousel className='block h-52 w-11/12 rounded-2xl ' slide={false}>
                                                {images.map((e,index) =>
                                                (
                                                    <img key={index} className=' object-cover	 rounded-md h-full w-full' src={`data:${e.contentType};base64,${e.file}`} alt="" />
                                                )
                                                )}

                                            </Carousel>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="bg-white w-8/12 ml-5 rounded-xl shadow-lg p-5 px-5 md:p-8 mb-6">

                            <form className="lg:col-span-2" >

                                <div className='p-2'>
                                    <div className="">
                                        <div className="flex justify-between">
                                            <h1 className="text-lg font-bold mb-5">INFORMACIÓN DE LA SOLICITUD</h1>
                                            <p className='text-blue-400 font-semibold uppercase	'>{directRequest.state.name}</p>

                                        </div>


                                        <div className="mb-5">
                                            <p className='font-base text-black'>Titulo:</p>
                                            <p className='font-semibold'>{directRequest.title}</p>
                                        </div>
                                        <div className="mb-5">
                                            <p className='text-semibold'>Descripcion:</p>
                                            <p className='font-base text-sm text-gray-400'>{directRequest.description}</p>
                                        </div>


                                        <div className="flex">
                                            <div className="w-3/12 mr-5">
                                                <label className='text-sm text-center block'>Professión:</label>
                                                <p className="font-semibold text-center text-sm">{directRequest.professionAvailability.profession.name}</p>
                                            </div>
                                            <div className="w-3/12 mr-5">
                                                <label className='text-sm text-center block'>Disponibilidad</label>
                                                <p className="font-semibold text-center text-sm">{directRequest.professionAvailability.availability.name}</p>

                                            </div>
                                            <div className="w-3/12 mr-5">
                                                <label className='text-sm text-center block'>Categoria</label>
                                                <p className="font-semibold text-center text-sm">{directRequest.categoryService.name}</p>

                                            </div>

                                            <div className="w-4/12">
                                                <label className='text-sm text-center block'>Fecha de solicitud</label>
                                                <p className="font-semibold text-center block  text-sm">{fechaEnEspañol}</p>
                                            </div>
                                        </div>


                                        <div className=" mt-5 w-full">
                                        <p className='font-bold text-base mb-3'>INFORMACIÓN DEL SERVICIO SOLICITADO</p>
                                        {
                                            directRequest.serviceTypeAvailabilityDto ? <><div className="p-4 bg-white shadow-lg rounded-lg">
                                            <div className="flex justify-between">
                                                <p className='font-bold'>{directRequest.serviceTypeAvailabilityDto.service.name}</p>
                                                <div className="text-white bg-personalized rounded-lg p-1.5">{directRequest.categoryService.name}</div>
                                            </div>
                                            <p className='mt-1 w-11/12 text-gray-600 text-sm mb-2'>{directRequest.serviceTypeAvailabilityDto.service.description}</p>
                                            <p className='font-bold'>S/ {directRequest.serviceTypeAvailabilityDto.service.price}</p>
                                        </div></> : <>
                                        
                                                <h1>NO ESCOGIO NINGUN SERVICIO </h1>
                                        
                                        </>
                                        }
                                        
                                        
                                            
                                            
                                        </div>





                                





                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>


                </Modal.Body >

            </Modal >
        </>
    );
}
