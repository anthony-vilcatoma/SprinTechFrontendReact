import { Routes, Route, BrowserRouter,Navigate } from 'react-router-dom';
import { LoginFormPage } from './pages/LoginFormPage';
import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/ServicePage';


// Esta función verifica si el usuario está autenticado(tiene su token)
function isAuthenticated() {
  // verificar si hay un token de acceso en el almacenamiento local o en el estado de la aplicación.
    const accessToken = localStorage.getItem("access_token");

  // En caso haya token significa que esta autenticado
  if(accessToken){
    return true;
  }else{
    return false;
  }

}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginFormPage />} />
        <Route
          path="/service"
          element={isAuthenticated() ? <ServicePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
