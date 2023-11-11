import { Routes, Route, BrowserRouter,Navigate } from 'react-router-dom';
import { LoginFormPage } from './pages/LoginFormPage';
import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/Client/ServicePage';
import { TicketSupportPage } from './pages/Client/TicketSuportPage';
import { AnswerSuportPage } from './pages/Admin/AnswerSuportPage';
import { TicketsPage } from './pages/Admin/TicketsPage';
import ConfigurationPage from './pages/ConfigurationPage';


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
        <Route path="/configuration"  element={ isAuthenticated() ? <ConfigurationPage/> : <Navigate to="/login"/>}/>
        <Route
          path="/service"
          element={isAuthenticated() ? <ServicePage /> : <Navigate to="/login" />} />

        <Route path="/supportList" element={isAuthenticated() ? <TicketsPage/> : <Navigate to="/login" />}/>
        <Route  path="/ticketsupport" element={isAuthenticated() ? <TicketSupportPage/> : <Navigate to="/login"  />}/>
        <Route path='/atenttion/:id' element={isAuthenticated() ? <AnswerSuportPage/> : <Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
