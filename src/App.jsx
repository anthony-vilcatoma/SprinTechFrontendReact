import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginFormPage } from './pages/LoginFormPage';
import { HomePage } from './pages/HomePage';
import { RegisterFormPage } from './pages/RegisterFormPage'
import { ServicePage } from './pages/Client/ServicePage';
import { TicketSupportPage } from './pages/Client/TicketSuportPage';
import { AnswerSuportPage } from './pages/Admin/AnswerSuportPage';
import ProtectedRoute from "./ProtectedRoute"
import { TicketsPage } from './pages/Admin/TicketsPage';
import ConfigurationPage from './pages/ConfigurationPage';
import TechnicalServicePage from './pages/Client/TechnicalServicePage';
import RequestClientsPage from './pages/Technical/RequestClientsPage';
import ClientPetitiosPage from './pages/Client/ClientPetitiosPage';
import '../src/index.css'


function App() {
  return (
    // Las rutas dentro de AuthProvider, podrán acceder a sus valores globables
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/iniciar-session" element={<LoginFormPage />} />
          <Route path="/registrar" element={<RegisterFormPage />} />

          {/* ProtectedRoute: verificará si el usuario esta authentificado */}
          <Route element={<ProtectedRoute/>} >
            <Route path="/configuracion"  element={<ConfigurationPage/>}/>
            <Route path="/buscar-tecnico"element={<ServicePage />} />
            <Route  path="/solicitudes-recibidas" element={<RequestClientsPage/>}/>
            <Route  path="/mis-solicitudes" element={<ClientPetitiosPage/>}/>
            <Route path="/lista-reclamos" element={<TicketsPage/>}/>
            <Route  path="/ticket-reclamo" element={<TicketSupportPage/>}/>
            <Route path='/atenttion/:id' element={<AnswerSuportPage/>}/>
            <Route path='/servicio/configuracion' element={<TechnicalServicePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
