
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { uploadFile } from '../firebase/config'

export function DirectRequestModal({onCloseModal, isOpen}) {

  const [errors, setErrors] = useState([])
  // Estado para los valores de los inputs
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    images: [],
  });
  
  // Función para manejar cambios en los inputs
  const handleInputChange = (event) => {
    const { name, type } = event.target;

    setFormValues((prevValues) => {
      if (type === 'file') {
        const imagesArray = Array.from(event.target.files);

        // Si es un input de tipo file, crea una nueva array de archivos
        const newFiles = imagesArray;
        return {
          ...prevValues,
          [name]: newFiles,
        };
      } else {
        // Si no es un input de tipo file, actualiza el valor directamente
        return {
          ...prevValues,
          [name]: event.target.value,
        };
      }
    });

  };

  const valuesSubmit = async() => {
    const { title, description, images } = formValues;

    const typeExtensionAccepted = ['jpg', 'png', 'svg', 'jpge'];
    const MAX_NUMBER_IMAGES = 10;
  
    // Funcion para validar que el campo no este vacío
    const validateNotEmpty = (value, errorMessage) => {
      if (value.length === 0) {
        setErrors([errorMessage]);
        return false;
      }
      return true;
    };
  
    // Validamos los campos
    if (!validateNotEmpty(title, "El Asunto es requerido")) return;
    if (!validateNotEmpty(description, "La descripción es requerida")) return;
    if (!validateNotEmpty(images, "Suba una imagen de su asunto")) return;
    if (images.length > MAX_NUMBER_IMAGES){
      setErrors([`Cantidad máxima de imagenes ${MAX_NUMBER_IMAGES}`])
      return;
    } 
    const isValidExtension = images.every((file) => {
      const extension = file.name.split('.').pop();
      return typeExtensionAccepted.includes(extension.toLowerCase());
    });
  
    // Validamos las extensiones soportadas
    if (!isValidExtension) {
      setErrors([
        "Extensión de archivo no soportada",
        `Solo se aceptan ${typeExtensionAccepted.join(', ')}`,
      ]);
      return;
    }
  
    setErrors([]);

    try {
      const imagesUrlSaved = []
      for(let img of images){
        const url = await uploadFile(img);
        imagesUrlSaved.push(url);
      }
      /**
       * LISTO PARA GUARDAR EN LA BASE DE DATOS
       */
      console.log(imagesUrlSaved);
    } catch (error) {
      console.error(error)
      alert("Error al intentar subir una imagen");
    }
  }


  return (
    <>
      <Modal show={isOpen} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="modal grid gap-y-5">
            <h3 className='w-full text-center text-3xl mb-4'>Detalle su Asunto</h3>
              <div className='text-red-600 font-semibold'>
                <>
                  {
                    errors.map((error) => {
                      return <li key={error} className=''>{error}</li>
                    })
                  }
                </>
              </div>
            <div className='flex flex-col'>
              <label htmlFor="title">Ingrese su Asunto</label>
              <input
                type="text"
                name='title'
                value={formValues.title}
                onChange={handleInputChange}
                className='p-4 rounded bg-gray-200 border-0'
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="description">Ingrese la descripción</label>
              <textarea
                type="text"
                name='description'
                id='description'
                value={formValues.description}
                onChange={handleInputChange}
                className='p-4 rounded bg-gray-200 border-0'
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="images">Ingrese sus imagenes</label>
              <input
                type='file'
                name='images'
                multiple
                max={10}
                id='images'
                onChange={handleInputChange}
                className='p-4 rounded bg-gray-200 border-0'
              />
            </div>
            <Button onClick={valuesSubmit}>Subir</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
