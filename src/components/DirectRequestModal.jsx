import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';

export function DirectRequestModal({ onCloseModal, isOpen, onUpdateFormValues }) {
  const [errors, setErrors] = useState([]);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'images') {
      const selectedImages = Array.from(files);
      setFormValues({...formValues, [name]: [...formValues.images, ...selectedImages]});
    } else {
      setFormValues({...formValues, [name]: value});
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = formValues.images.filter((_, index) => index !== indexToRemove);
    setFormValues({...formValues, images: updatedImages});
  };

  const valuesSubmit = () => {
    onCloseModal();
  };

  useEffect(() => {
    onUpdateFormValues(formValues);
  }, [formValues]);

  return (
    <>
      <Modal show={isOpen} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body style={{maxHeight:`45rem`}}>
          <div className="modal grid gap-y-5">
          <h3 className='w-full text-center text-3xl mb-4'>Detalle su Asunto</h3>
              <div className='text-red-600 font-semibold'>
                
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
              <label htmlFor="images">Ingrese sus imágenes</label>
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
            <div className="flex flex-wrap">
              {formValues.images.map((image, index) => (
                <div key={index} className="relative m-2">
                  <img src={URL.createObjectURL(image)} alt={`Image ${index}`} className="w-36 h-36 object-cover rounded" />
                  <button onClick={() => removeImage(index)} className="absolute top-2 right-2 rounded-full w-5 h-5 flex justify-center items-center bg-red-500 text-white p-1  text-xs">X</button>
                </div>
              ))}
            </div>
            <Button onClick={valuesSubmit}>Guardar</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
