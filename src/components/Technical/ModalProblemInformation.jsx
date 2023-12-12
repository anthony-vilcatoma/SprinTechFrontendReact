import { Modal } from 'flowbite-react';
import { Carousel } from 'flowbite-react';
import iconProfession from '../../assets/images/iconProfession.png'
import iconTypeService from '../../assets/images/iconTypeService.png'

export function ModalProblemInformation({ onClose, directRequest }) {
  console.log("Imprimiendo modal")
  let fechaActual = new Date(directRequest.createdAt);
  let opciones = { day: 'numeric', month: 'long', year: 'numeric' };
  let fechaEnEspañol = fechaActual.toLocaleString('es-PE', opciones);

  var images = directRequest.files;

  return (
    <>
      <Modal show={true} onClose={onClose} size="6xl" style={{ fontFamily: 'Urbanist, sans-serif' }} className='h-fit'>
        <Modal.Body className="py-5 px-10 relative ">
          <button className="absolute top-5 right-5"><i class=' bx bxs-x-circle text-3xl' onClick={onClose} ></i></button>
          <div className="flex">
            <div className="w-5/12 bg-gray-50 rounded-xl shadow-2xl p-4 px-4 md:p-8 mb-6">
              <div className="flex flex-col ">



                <div className="text-gray-600">
                  <p className="font-bold text-lg text-base mb-5">Mala gestion del Sistema al registrar pago por medio de mi tarjeta

                  </p>

                  <div className="container-person mb-5  flex items-center justify-evenly">
                    <img className="object-cover w-24 h-24 rounded-full"
                      src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" />
                    <div className="information">
                      <ul>
                        <li className="mb-0 font-medium"><p>Anthony Ruben</p></li>
                        <li className="font-medium"><p>Vilcatoma Palacios</p></li>
                        <li className="font-medium"><b >----</b></li>
                      </ul>
                    </div>
                  </div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias quasi fugiat deleniti suscipit porro animi perspiciatis, dolorem vero libero odio accusantium distinctio aliquam consequatur reiciendis laborum harum reprehenderit doloribus voluptate?</p>

                </div>
              </div>
            </div>



            <div className="bg-gray-50 ml-5 rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6">

              <form className="lg:col-span-2" >

                <div >
                  <div className="text-sm">
                    <h1 className="text-center block mx-auto text-lg font-bold mb-5">INFORMACIÓN DE LA SOLICITUD</h1>
                    <div className="flex">
                      <div className="w-4/12 mr-5">
                        <label className='text-base'>Professión:</label>
                        <p className="font-semibold text-gray-700 text-base">Mecanica</p>
                      </div>
                      <div className="w-4/12 mr-5">
                        <label htmlFor="full_name">Categoria</label>
                        <p className="font-semibold text-gray-700 text-base">Limpieza</p>

                      </div>

                      <div className="w-3/12">
                        <label htmlFor="full_name">Fecha de solicitud</label>
                        <p className="font-semibold text-gray-700 text-base">19-10-2023</p>
                      </div>
                    </div>


                    <div className="flex mt-5 w-full">

                      <div className="flex mr-5 flex-col justify-center items-center w-5/12">
                        <h1 className="text-center block mx-auto text-base font-bold">Imagenes del problema</h1>

                        <Carousel className='block h-52 w-52 rounded-2xl mt-5' slide={false}>
                          {images.map(e =>
                          (
                            <img className=' object-cover	 rounded-md h-full w-full' src={`data:${e.contentType};base64,${e.file}`} alt="" />
                          )
                          )}

                        </Carousel>
                      </div>


                      <div className="block w-7/12">
                        <h1 className="text-center block mx-auto text-base font-bold">Servicio Solicitado</h1>
                        <div className="bg-gray-50 p-5 rounded-lg shadow-lg mt-5">
                          <div className="max-w-3xl	">
                            <div className="mb-5 mx-auto w-11/12">
                              <label className='w-fit block text-base text-center mx-auto'>Nombre de tu servicio</label>
                              <p className="font-semibold block text-center text-gray-700 text-base">Limpieza de motor al vapor</p>

                            </div>
                            <div className="mt-3">
                              <label className='w-fit block text-base text-center mx-auto'>Descripción del servicio que estas brindando:</label>
                              <p
                                className="h-24 overflow-y-scroll font-semibold block text-justify p-3 text-gray-700 text-base"
                              >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                            </div>
                          </div>


                        </div>

                      </div>
                    </div>





                    <div className="mt-5 flex">
                      <p className='block text-base'>El cliente desea que lo atiendan para:</p>
                      <p
                        className=" ml-5 block font-semibold block text-justify  text-gray-700 text-base">12-10-2004</p>
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
