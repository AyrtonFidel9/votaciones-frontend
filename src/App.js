import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PublicRoutes } from './routes';
import { PrivateRoutes } from './routes';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Suspense, lazy } from 'react';
import { Loading } from './components';
import { AuthGuard, RecoveryGuard, AdminGuard, JGEGuard, SocioGuard, AdminJgeGuard } from './guards';

const Login = lazy(() => import('./pages/Login'));
const Inicio = lazy(() => import('./pages/Inicio'));
const IngresarNumero = lazy(()=>import('./pages/Login/pages/IngresarNumero'));
const IngresarCodigo = lazy(()=>import('./pages/Login/pages/IngresarCodigo'));
const ReestablecerPass = lazy(()=>import('./pages/Login/pages/ReestablecerPass'));
const Usuarios = lazy(()=>import('./pages/Usuarios'));
const UsuariosForm = lazy(()=>import('./pages/Usuarios/Pages/UsuariosForm'));
const Agencias = lazy(()=>import('./pages/Agencias'));
const Reportes = lazy(()=>import('./pages/Reportes'));
const Perfil = lazy(()=>import('./pages/Perfil'));
const Elecciones = lazy(()=>import('./pages/Elecciones'));
const EleccionForm = lazy(()=>import('./pages/Elecciones/pages/EleccionForm'));
const InscripcionesReview = lazy(()=>import('./pages/Inscripciones/Review'));
const InscripcionesList = lazy(()=>import('./pages/Inscripciones/List'));
const Representantes = lazy(()=>import('./pages/Representantes'));
const RepresentantesForm = lazy(()=>import('./pages/Representantes/pages/RepresentantesForm'));
const Votaciones = lazy(()=>import('./pages/Votaciones'));
const NoDisponible = lazy(()=>import('./pages/NoDisponible'));
const LoadUsuarios = lazy(()=>import('./pages/Usuarios/Pages/LoadUsuarios'));
const CuentaForm = lazy(()=>import('./pages/Usuarios/Pages/CuentaForm'));
const AgenciaForm = lazy(()=>import('./pages/Agencias/pages/AgenciaForm'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading/>}>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <Provider store={store}>
              <Routes>
                <Route path="/" element={<Navigate to={PrivateRoutes.INICIO} />}/>
                <Route path="*" element={<>NOT FOUND</>}/>
                <Route path={PublicRoutes.NO_DISPONIBLE} element={<NoDisponible/>}/>
                <Route path={PublicRoutes.LOGIN} element={<Login/>}/>
                <Route path={PublicRoutes.INGRESAR_NUMERO} element={<IngresarNumero/>}/>
                <Route element={<AuthGuard/>}>
                  <Route path={PrivateRoutes.INICIO} element={<Inicio/>}/>
                  <Route path={PrivateRoutes.PERFIL} element={<Perfil/>}/>
                  <Route element={<AdminGuard/>}>
                    <Route path={PrivateRoutes.AGENCIAS} element={<Agencias/>}/>
                    <Route path={PrivateRoutes.AGENCIA_INGRESAR} element={<AgenciaForm/>}/>
                    <Route path={PrivateRoutes.AGENCIA_MODIFICAR} element={<AgenciaForm/>}/>
                    <Route path={PrivateRoutes.USUARIOS} element={<Usuarios/>}/>
                    <Route path={PrivateRoutes.INGRESAR_USUARIOS} element={<UsuariosForm/>}/>
                    <Route path={PrivateRoutes.MODIFICAR_USUARIOS} element={<UsuariosForm/>}/>
                    <Route path={PrivateRoutes.USUARIOS_CARGAR_SOCIOS} element={<LoadUsuarios/>}/>
                    <Route path={PrivateRoutes.MODIFICAR_CUENTA} element={<CuentaForm/>}/>
                  </Route>
                  <Route element={<JGEGuard/>}>
                    <Route path={PrivateRoutes.ELECCIONES} element={<Elecciones/>}/>
                    <Route path={PrivateRoutes.ELECCIONES_INGRESAR} element={<EleccionForm/>}/>
                    <Route path={PrivateRoutes.ELECCIONES_MODIFICAR} element={<EleccionForm/>}/>
                    <Route path={PrivateRoutes.INSCRIPCIONES} element={<InscripcionesReview/>}/>
                    <Route path={PrivateRoutes.REPRESENTANTES} element={<Representantes/>}/>
                    <Route path={PrivateRoutes.REPRESENTANTES_INGRESAR} element={<RepresentantesForm/>}/>
                    <Route path={PrivateRoutes.REPRESENTANTES_MODIFICAR} element={<RepresentantesForm/>}/>
                  </Route>  
                  <Route element={<SocioGuard/>}>
                    <Route path={PrivateRoutes.VOTACIONES} element={<Votaciones/>}/>
                    <Route path={PrivateRoutes.INSCRIPCIONES} element={<InscripcionesList/>}/>
                  </Route>
                  <Route element={<AdminJgeGuard/>}>
                    <Route path={PrivateRoutes.REPORTES} element={<Reportes/>}/>
                  </Route>
                </Route>
                <Route element={<RecoveryGuard/>}>
                  <Route path={PrivateRoutes.INGRESAR_CODIGO} element={<IngresarCodigo/>}/>              
                  <Route path={PrivateRoutes.REESTABLECER_PASS} element={<ReestablecerPass/>}/>
                </Route>
              </Routes>
            </Provider>
          </PersistGate>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
