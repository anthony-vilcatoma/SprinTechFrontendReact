import { Modal } from 'flowbite-react';
import { getUserLocation } from '../../assets/js/userLocation';
import { useEffect, useState } from "react";
import { createInvoice } from '../../apis/Client/Invoice';


export function ModalTarifaComponent({ onClose, directRequest }) {
    const [materiales, setMateriales] = useState([]);
    const [formMaterial, setFormMaterial] = useState({
        name: "",
        price: null,
        stock: null
    });

    const [form, setForm] = useState({
        directRequestId: directRequest.id,
        task: null,
        description: null,
        price: null,
        materiales: materiales
    })
    var images = [];
    (directRequest.files).forEach(element => {
        images.push(element)
    });

    const sendInvoice = () => {
        const access_token = window.localStorage.getItem("access_token")
        createInvoice(access_token, form)
            .then(res => console.log(res.data.body))
        onClose()
    }

    const initializeMap = async () => {
        try {
            const userLocation = await getUserLocation();

            const map = new google.maps.Map(document.getElementById('mapa_tarifa'), {
                center: { lat: directRequest.latitude, lng: directRequest.longitude },
                zoom: 15
            });
            const iconSize = new window.google.maps.Size(35, 40);

            let marker = new google.maps.Marker({
                position: { lat: directRequest.latitude, lng: directRequest.longitude },
                map: map,
                animation: google.maps.Animation.DROP,
            });

        } catch (error) {
            console.error("Error occurred while initializing map:", error);
        }
    };



    const handleEdit = (index) => {
        // Aquí puedes implementar la lógica para editar el material en el índice dado
        // Puedes usar el índice para identificar el material a editar en la lista materiales
        // Por ejemplo: actualizando el estado 'formMaterial' con los datos del material seleccionado
    };

    const handleDelete = (index) => {
        const newMateriales = [...materiales];
        newMateriales.splice(index, 1);
        setMateriales(newMateriales);
    };

    useEffect(() => {
        // Check if the Google Maps script is already loaded
        if (!window.google) {
            // Load the Google Maps script
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBihRqZC1ca4ienBNShbR6ZtNPoLxkrntU&callback=initMap&v=weekly`;
            script.defer = true;
            document.head.appendChild(script);

            // Set the initMap function to your custom initializeMap function
            window.initMap = initializeMap;

            // Clean up resources when the component is unmounted
            return () => {
                document.head.removeChild(script);
                window.initMap = undefined;
            };
        } else {
            // If the script is already loaded, directly initialize the map
            initializeMap();


        }

    }, []);

    return (
        <>
            <Modal show={true} onClose={onClose} size="5xl" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                <Modal.Body className="py-5 px-10 relative ">
                    <div className="flex">
                        <div className="w-5/12 mr-10">
                            <h1 className='text-3xl font-bold mb-5 '>Ubicación</h1>

                            <div id='mapa_tarifa' className="mb-5 shadow-2xl w-full mt-10 rounded-lg h-72 bg-gray-400">

                            </div>

                            <div className="">
                                <label htmlFor="" className='block font-semibold mb-2'>Fotos de la solicitud</label>
                                <div className="flex">

                                    {images.map(e =>
                                    (<div className="img w-20 h-20 bg-gray-200 rounded-md mr-5 ">
                                        <img className=' object-cover	 rounded-md h-full w-full' src={`data:${e.contentType};base64,${e.file}`} alt="" />
                                    </div>)
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className="w-7/12 overflow-y-scroll h-110	">
                            <div className="flex justify-between">
                                <h1 className='text-3xl font-bold'>Cotiza la Solicitud</h1>
                                <div className="flex">
                                    <button className="bg-gray-400 text-white rounded-md p-2" onClick={onClose}>Cancelar</button>
                                    <button onClick={sendInvoice} className='bg-orange-personalized text-white  ml-4 rounded-md p-2'>Enviar</button>
                                </div>

                            </div>
                            <div className="flex justify-between  mt-5">
                                <div className="w-5/12 ">
                                    <label className='block w-8/12 font-medium text-lg'>Asunto:</label>
                                    <input type="text" onChange={(event) => {
                                        setForm({ ...form, task: event.target.value })
                                    }} className="block font-medium  w-12/12 p-2 py-3 border-gray-200 bg-gray-100 rounded-md text-base   focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 " />

                                </div>
                                <div className="w-5/12  flex flex-col content-end self-end">
                                    <label className='block w-7/12 font-medium text-lg'>Precio Total:</label>
                                    <input onChange={(event) => {
                                        setForm({ ...form, price: event.target.value })
                                    }} type="text" className="block font-medium  w-10/12 p-2 py-3  border-gray-100 bg-gray-100 rounded-md text-base       focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 " />

                                </div>

                            </div>

                            <div className="mb-4 mt-5 flex flex-col">
                                <label className='block w-6/12 font-medium mb-2 text-lg'>Describe la cotización:</label>
                                <textarea onChange={(event) => {
                                    setForm({ ...form, description: event.target.value })
                                }} name="textarea" rows={5} className=' font-medium block text-justify w-full p-2  border-gray-200 bg-gray-100 rounded-md text-gray-600 text-base  focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 p-5 '></textarea>

                            </div>

                            <div className="">
                                <label className='block w-6/12 font-medium  text-lg'>Materiales:</label>
                                <p className='text-sm text-gray-700'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi cumque quod.</p>

                                <div className="flex justify-center items-center mt-4">
                                    <div className="flex w-11/12">
                                        <input onChange={(event) => {
                                            setFormMaterial({ ...formMaterial, name: event.target.value })
                                        }} type="text" className="block  font-medium w-4/12 p-2 border-gray-200 bg-gray-100 rounded-md text-base   focus:border-blue-500 mr-4 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 "
                                            placeholder='Nombre' value={formMaterial.name} />

                                        <input onChange={(event) => {
                                            setFormMaterial({ ...formMaterial, price: event.target.value })
                                        }} type="text" className="block  font-medium w-3/12 p-2 border-gray-200 bg-gray-100 rounded-md text-base     focus:border-blue-500 mr-4 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 " placeholder='Precio' value={formMaterial.price} />

                                        <input onChange={(event) => {
                                            setFormMaterial({ ...formMaterial, stock: event.target.value })
                                        }} type="text" className="block  font-medium w-2/12 p-2 border-gray-200 bg-gray-100 rounded-md text-base     focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 " placeholder='Stock' value={formMaterial.stock} />
                                    </div>
                                    <button onClick={() => {
                                        // Crear un nuevo objeto de material usando los datos del formulario actual
                                        const nuevoMaterial = {
                                            name: formMaterial.name,
                                            price: formMaterial.price,
                                            stock: formMaterial.stock
                                        };

                                        // Agregar el nuevo material a la lista existente usando setMateriales y el operador spread
                                        setMateriales([...materiales, nuevoMaterial]);

                                        // Limpiar el formulario después de agregar el material
                                        setFormMaterial({
                                            name: "",
                                            price: "",
                                            stock: ""
                                        });
                                    }} className='w-5 h-5 bg-orange-personalized p-4 rounded-full flex justify-center items-center text-white'>+</button>
                                </div>
                            </div>
                            <div className=" overflow-x-auto mt-5 h-fit shadow-md sm:rounded-lg">
                                <div className="overflow-x-auto  shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="py-3 px-6">Nombre</th>
                                                <th scope="col" className="py-3 px-6">Precio</th>
                                                <th scope="col" className="py-3 px-6">Stock</th>
                                                <th scope="col" className="py-3 px-6">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {
                                                materiales.map((element, index) => (
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="py-4 px-6">{element.name}</td>
                                                        <td className="py-4 px-6">{element.price}</td>
                                                        <td className="py-4 px-6">{element.stock}</td>
                                                        <td className="py-4 px-6">
                                                            <button onClick={() => handleEdit(index)}>
                                                                <i className='bx bxs-edit inline-block align-middle' style={{ color: '#1e293b' }}></i>
                                                            </button>
                                                            <button onClick={() => handleDelete(index)}>
                                                                <i className='bx bx-trash inline-block align-middle' style={{ color: '#1e293b' }}></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>

                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}
