import React, { useEffect, useState } from 'react'
import { LayaoutDashboard } from '../../components/LayaoutDashboard';
import imgPerfil from "../../assets/images/perfil.svg"
import { getUserInformation, updateClientInformation, updateUserInformationApi } from '../../apis/Client/UserApi';

export default function ConfigurationClientPage() {
  const [clientId, setClientId] = useState();
  const [userInformation, setUserInformation] = useState({
    name: "",
    lastname: "",
    motherLastname: "",
    birthDate: null,
    latitude: null,
    longitude: null,
    file:null
  });

  const [selectedImage, setSelectedImage] = useState({
    file: null,
    preview: null, // Para almacenar la URL de vista previa de la imagen
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Crear una URL de vista previa para mostrar la imagen
      const previewURL = URL.createObjectURL(file);

      setSelectedImage({
        ...selectedImage,
        file: file,
        preview: previewURL,
      });
    }
  };

  const [viewPassword, setViewPassword] = useState(true);
  const changeDataUserInformation = (event) => {
    const { name, value } = event.target;
    setUserInformation({ ...userInformation, [name]: value });
  }


  const updateUserInformation = () => {
    const accessToken = window.localStorage.getItem("access_token")
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));

    if (selectedImage.file != null) {
      updateUserInformationApi(decodedToken.sub, accessToken, { file: selectedImage.file })
      .then(res => console.log("exit"))
    }
    updateClientInformation(accessToken, userInformation, clientId)
        .then(res => console.log(res.data.body))

}

  useEffect(() => {
    const accessToken = window.localStorage.getItem("access_token");
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    getUserInformation(decodedToken.sub, accessToken)
      .then(response => {
        const data = response.data.body
        console.log("user", data);
        let date = new Date(data.birthDate);
        setUserInformation({
          ...userInformation,
          name: data.name,
          lastname: data.lastname,
          motherLastname: data.motherLastname,
          birthDate: date,
          latitude: data.latitude,
          longitude: data.longitude,
          file:data.file
        })
        setClientId(data.id)

      })
  }, [])
  return (
    <LayaoutDashboard>
      <div className='h-screen bg-gray-300' style={{ fontFamily: 'Urbanist, sans-serif' }}>


        <main className="px-2 md:px-20 pt-10  pb-12 2xl:px-60">
          <h1 className="text-2xl font-semibold py-4">Configuraciones de la Cuenta</h1>

          {/* CONTENT */}
          <div className="bg-white rounded py-3 px-5 sm:px-10 mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold py-4">Mi cuenta</h2>

            {/* PROFILE PHOTO */}
            <div className="flex flex-row items-center gap-x-5">
              <img
                className="w-28 h-28 rounded-full"
                src={selectedImage.preview || `data:image/*;base64,${userInformation.file}`}
                alt=""
              />

              <input
                id="fileInput"
                type="file"
                required
                accept="image/*"
                className="rounded-md h-fit bg-personalized text-white font-semibold rounded px-2 py-1"
                onChange={handleFileChange}
                multiple={false}
              />

            </div>

            <div className="grid gap-y-2">

              <div className="pt-4">
                <div className="flex flex-row justify-between gap-y-3 gap-x-5">

                  <div className="w-1/3">
                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                    <input onChange={changeDataUserInformation} type="text" placeholder="Nombre" value={userInformation.name} name="name" className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Ap. Paterno</label>
                    <input type="text" name="lastname" onChange={changeDataUserInformation} placeholder="Nombre" value={userInformation.lastname} className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div className="w-1/3">
                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Ap. Materno</label>
                    <input type="text" onChange={changeDataUserInformation} name="motherLastname" placeholder="Nombre" value={userInformation.motherLastname} className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>

                </div>

              </div>

              {/* CONTRASEÑA */}
              <div>
                <h2 className="text-2xl font-semibold pt-4">Contraseña</h2>
                <p className="text-gray-400 text-sm font-medium">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
                </p>

                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                <div className="flex flex-wrap gap-2 ">
                  <input type={viewPassword ? "password" : "text"} placeholder="**********" className="rounded-md border-0 py-1.5 pl-7  pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <button className="px-3 py-1 rounded border border-slate-300">
                    <span className="font-medium text-amber-600" onClick={() => {
                      setViewPassword(!viewPassword);
                    }}>Ver</span>
                  </button>
                  <button className="px-3 py-1 rounded border border-slate-300">
                    <span className="font-medium text-slate-800">Cambiar</span>
                  </button>
                </div>
              </div>


              <hr className="my-3" />


              <div className="flex justify-end gap-x-4 mb-2">
                <button className="px-3 py-1 rounded border border-slate-300">
                  <span className="font-medium text-slate-800">Cancelar</span>
                </button>
                <button onClick={updateUserInformation} className="h-fit bg-personalized text-white font-semibold rounded px-2 py-1">Confirmar Cambios</button>

              </div>





            </div>
          </div>
          {/* END CONTENT */}
        </main>
      </div>
    </LayaoutDashboard>
  )
}
