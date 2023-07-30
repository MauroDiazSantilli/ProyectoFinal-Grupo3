import { Routes, Route } from "react-router-dom";
import AdminProductos from "../productos/AdminProductos";
import CrearProducto from "../productos/CrearProducto";
import AdminUsuarios from "../usuarios/AdminUsuarios";
import AdminPedidos from "../pedidos/AdminPedidos";
import EditarProducto from "../productos/EditarProducto";
import EditarUsuario from "../usuarios/EditarUsuario";
import Error404 from "../views/Error404";

const RutasAdministrador = () => {
  return (
    <>
      <Routes>
        <Route path="/productos" element={<AdminProductos></AdminProductos>}></Route>
        <Route
          exact
          path="/crear"
          element={<CrearProducto></CrearProducto>}
        ></Route>
        <Route
          exact
          path="/productos/editar/:id"
          element={<EditarProducto></EditarProducto>}
        ></Route>
        <Route exact path="/pedidos" element={<AdminPedidos></AdminPedidos>}></Route>
        
        <Route
        exact
          path="/usuarios"
          element={<AdminUsuarios></AdminUsuarios>}
        ></Route>
        <Route
        exact
          path="/usuarios/editar/:id"
          element={<EditarUsuario></EditarUsuario>}
        ></Route>
         <Route path="*" element={<Error404></Error404>} ></Route>
      </Routes>
    </>
  );
};

export default RutasAdministrador;
