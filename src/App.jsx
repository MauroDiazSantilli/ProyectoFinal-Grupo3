import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/common/Menu";
import Footer from "./components/common/Footer";
import Error404 from "./components/views/Error404"
import SobreNosotros from "./components/views/SobreNosotros"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetalleProducto from "./components/views/DetalleProducto";
import Pedido from "./components/views/Pedido";
import PagPrincipal from "./components/views/Principal/PagPrincipal";
import RegistroUsuarios from "./components/views/RegistroUsuarios";
import Login from "./components/views/Login";
import { useState } from "react";
import RutasAdministrador from "./components/routes/RutasAdministrador";
import RutasProtegidas from "./components/routes/RutasProtegidas";

function App() {

  const usuarioStorage = JSON.parse(sessionStorage.getItem('usuario')) || {}
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioStorage);
  const [modoOscuro, setModoOscuro] = useState(false)

  const cambiarModoOscuro = () => {
    setModoOscuro(prevModo => !prevModo);
  };

  if (modoOscuro) {
    document.body.classList.add("modo-oscuro");
  } else {
    document.body.classList.remove("modo-oscuro");
  }

  return (
    <BrowserRouter>
      <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} modoOscuro={modoOscuro} cambiarModoOscuro={cambiarModoOscuro} />
      <Routes>
        <Route path="/" element={<PagPrincipal></PagPrincipal>}></Route>
        <Route exact path="/administrador/*" element={
          <RutasProtegidas>
            <RutasAdministrador></RutasAdministrador>
          </RutasProtegidas>
        }></Route>
        <Route path="/AcercaDe" element={<SobreNosotros></SobreNosotros>}></Route>
        <Route exact path="/detalleProducto/:id" element={<DetalleProducto></DetalleProducto>} ></Route>
        <Route exact path="/pedido" element={<Pedido></Pedido>} ></Route>
        <Route exact path="/registro" element={<RegistroUsuarios></RegistroUsuarios>} ></Route>
        <Route exact path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>} ></Route>
        <Route path="*" element={<Error404></Error404>}></Route>
      </Routes>
      <Footer modoOscuro={modoOscuro} />
    </BrowserRouter>
  );
}

export default App;
