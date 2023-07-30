import {
  Container,
  CardGroup,
  Row,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Comida from "./Comida";
import { obtenerProductos } from "../../../helpers/queries";
import Swal from "sweetalert2"
import ContenedorCategorias from "./ContenedorCategorias";



const ContenedorComidas = ({categoriaBuscada, setCategoriaBuscada, busqueda, setHayProductosEnPedido}) => {

  const [productos, setProductos] = useState([])


  useEffect(() => {
    obtenerProductos().then((respuesta) => {
      if (respuesta != null) {
        if(busqueda.length > 0) {
          const busquedaMayus = busqueda.charAt(0).toUpperCase() + busqueda.slice(1);
          const productosBuscados = respuesta.filter(value => value.nombreProducto.includes(busquedaMayus))
          return setProductos(productosBuscados)
        }
        setProductos(respuesta)
      } else {
        Swal.fire("Error", "No se pudo obtener los datos de la API", "error")
        // navegacion("/error404")
      }
    })
  }, [busqueda])

  return (
    <>
    <ContenedorCategorias setCategoriaBuscada={setCategoriaBuscada}></ContenedorCategorias>
    <Container className="my-5">
      <CardGroup>
        <Row xs={1} md={2} lg={3}>
          {
            productos.map((producto) => {
              if (categoriaBuscada === producto.categoria || categoriaBuscada === "" || categoriaBuscada === "todos") {
                return  <Comida setHayProductosEnPedido={setHayProductosEnPedido} producto={producto} key={producto._id}></Comida>
              }
            })
          }
        </Row>
      </CardGroup>
    </Container>
    </>
  );
};

export default ContenedorComidas;
