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



function App() {
  return (
    // Las rutas dentro de AuthProvider, podrán acceder a sus valores globables
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginFormPage />} />
          <Route path="/register" element={<RegisterFormPage />} />

          {/* ProtectedRoute: verificará si el usuario esta authentificado */}
          <Route element={<ProtectedRoute/>} >
            <Route path="/configuration"  element={<ConfigurationPage/>}/>
            <Route path="/service"element={<ServicePage />} />
            <Route path="/supportList" element={<TicketsPage/>}/>
            <Route  path="/ticketsupport" element={<TicketSupportPage/>}/>
            <Route path='/atenttion/:id' element={<AnswerSuportPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
