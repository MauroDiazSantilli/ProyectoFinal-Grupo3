import { Routes, Route } from "react-router-dom";
import AdminProductos from "../productos/AdminProductos";
import CrearProducto from "../productos/CrearProducto";
import AdminUsuarios from "../usuarios/AdminUsuarios";
import AdminPedidos from "../pedidos/AdminPedidos";
import EditarProducto from "../productos/EditarProducto";
import EditarPedido from "../pedidos/EditarPedido";

const RutasAdministrador = () => {
    return (
        <>
            <Routes>
            <Route path="/" element={<AdminProductos></AdminProductos>}></Route> 
            <Route exact path="/crear" element={<CrearProducto></CrearProducto>}></Route>
            <Route exact path="/editar" element={<EditarProducto></EditarProducto>}></Route>
            <Route path="/pedidos" element={<AdminPedidos></AdminPedidos>}></Route> 
            <Route path="/pedidos/editar/*" element={<EditarPedido></EditarPedido>}></Route> 
            <Route path="/usuarios" element={<AdminUsuarios></AdminUsuarios>}></Route>
            </Routes>
        </>
    );
};

export default RutasAdministrador;