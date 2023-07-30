import { Container, Table, Button } from "react-bootstrap";
import ItemProducto from "./ItemProducto";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { obtenerProductos } from "../../helpers/queries";
import Swal from "sweetalert2";

const AdminProductos = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    obtenerProductos().then((respuesta) => {
      if(respuesta)
      {
        setProductos(respuesta);
      }
      else{
        Swal.fire(
          'Se produjo un error al intentar cargar los datos',
          `Intente realizar esta operacion mas tarde`,
          'error');
      }
    })

  },[])

  return (
    <Container className="mainSection my-4">
      <h1 className="display-4">Administrador de Productos</h1>
      <hr></hr>
      <Link to={"/administrador/crear"}>
        <Button className="btn btn-primary mb-3 rounded" id="btn-agregar-producto"> 
        <FaCirclePlus></FaCirclePlus>
        </Button>
      </Link>
      <section></section>
      <section className="table-responsive">
        <Table bordered hover className="table-dark">
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Categoria</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
            productos.map((producto) => <ItemProducto key={producto._id} producto={producto} setProductos={setProductos}></ItemProducto>)
            }
          </tbody>
        </Table>
      </section>
    </Container>
  );
};

export default AdminProductos;
