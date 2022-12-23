import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PublicRoutes } from './models';
import { PrivateRoutes } from './models/routes';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Suspense, lazy } from 'react';
import { Loading } from './components';
import { AuthGuard, RecoveryGuard, AdminGuard, JGEGuard, SocioGuard } from './guards';

const Login = lazy(() => import('./pages/Login'));
const Inicio = lazy(() => import('./pages/Inicio'));
const IngresarNumero = lazy(()=>import('./pages/Login/pages/IngresarNumero'));
const IngresarCodigo = lazy(()=>import('./pages/Login/pages/IngresarCodigo'));
const ReestablecerPass = lazy(()=>import('./pages/Login/pages/ReestablecerPass'));
const Socios = lazy(()=>import('./pages/Socios'));
const Agencias = lazy(()=>import('./pages/Agencias'));
const Reportes = lazy(()=>import('./pages/Reportes'));
const Perfil = lazy(()=>import('./pages/Perfil'));

const Elecciones = lazy(()=>import('./pages/Elecciones'));
const Inscripciones = lazy(()=>import('./pages/Inscripciones'));
const Listas = lazy(()=>import('./pages/Listas'));
const Votaciones = lazy(()=>import('./pages/Votaciones'));


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
                <Route path={PublicRoutes.LOGIN} element={<Login/>}/>
                <Route path={PublicRoutes.INGRESAR_NUMERO} element={<IngresarNumero/>}/>
                <Route element={<AuthGuard/>}>
                  <Route path={PrivateRoutes.INICIO} element={<Inicio/>}/>
                  <Route path={PrivateRoutes.PERFIL} element={<Perfil/>}/>
                  <Route element={<AdminGuard/>}>
                    <Route path={PrivateRoutes.SOCIOS} element={<Socios/>}/>
                    <Route path={PrivateRoutes.AGENCIAS} element={<Agencias/>}/>
                    <Route path={PrivateRoutes.REPORTES} element={<Reportes/>}/>
                  </Route>
                  <Route element={<JGEGuard/>}>
                    <Route path={PrivateRoutes.ELECCIONES} element={<Elecciones/>}/>
                    <Route path={PrivateRoutes.REPORTES} element={<Reportes/>}/>
                    <Route path={PrivateRoutes.INSCRIPCIONES} element={<Inscripciones/>}/>
                    <Route path={PrivateRoutes.LISTAS} element={<Listas/>}/>
                  </Route>  
                  <Route element={<SocioGuard/>}>
                    <Route path={PrivateRoutes.VOTACIONES} element={<Votaciones/>}/>
                    <Route path={PrivateRoutes.INSCRIPCIONES} element={<Inscripciones/>}/>
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
