import { Button, Card, Col } from "react-bootstrap";
import { HiX } from "react-icons/hi";
import Swal from "sweetalert2";
import { borrarPedido, obtenerPedidos, obtenerProductos, consultaEditarPedido, obtenerUsuario } from "../../helpers/queries";
import { useEffect, useState } from "react";

const ItemPedido = ({ pedido, setPedidos, actualizarPedidos }) => {

  const [productos, setProductos] = useState([])
  const [pedidoEstado, setPedidoEstado] = useState(pedido);
  const [usuario, setUsuario] = useState();
  useEffect(() => {
    obtenerProductos().then((respuesta) => {
      if (respuesta) {
        setProductos(respuesta);
      }
      else {
        Swal.fire(
          'Se produjo un error al intentar cargar los datos',
          `Intente realizar esta operacion mas tarde`,
          'error');
      }
    })
    verificarEstado()
    obtenerUsuario(pedido.usuario).then((respuesta)=>{
      setUsuario(respuesta)
    })
  }, [pedidoEstado])

  function formatearFecha(fecha) {
    const dateObj = new Date(fecha);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }
  

  const eliminarPedido = () => {
    Swal.fire({
      title: "¿Esta seguro de eliminar el pedido?",
      text: "Una vez borrado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //aqui tengo que hacer la peticion delete
        borrarPedido(pedido._id).then((respuesta) => {
          if (respuesta.status === 200) {
            Swal.fire(
              "Pedido Eliminado",
              `El Pedido del usuario ${pedido.usuario} fue eliminado`,
              "success"
            );
            obtenerPedidos().then((respuesta) => {
              setPedidos(respuesta);
            })
          } else {
            Swal.fire("Se produjo un error", "Intentelo mas tarde", "error");
          }
        });
      }
    });
  };

  const realizarPedido = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Seguro que el pedido ya fue realizado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const pedidoEditado = { ...pedidoEstado, estado: false };
        consultaEditarPedido(pedidoEditado, pedido._id).then((respuesta) => {
          if (respuesta && respuesta.status === 200) {
            setPedidoEstado(pedidoEditado); // Actualiza el estado de pedidoEstado
            Swal.fire(
              "Accion realizada",
              `El pedido fue marcado como realizado`,
              "success"
            );
            actualizarPedidos(); // Llama a la función para actualizar los pedidos
          } else {
            Swal.fire(
              "Se produjo un error",
              `El pedido no fue realizado, intentelo mas tarde`,
              "error"
            );
          }
        })

      }
    });
  }

  const verificarEstado = () => {
    if (pedidoEstado.estado === true) {
      return <Button className="btn-success" onClick={realizarPedido}>Entregar</Button>;
    } else {
      return <Button className="btn-danger" disabled >Entregado</Button>;
    }

  };
  const manejadorColorCard = () => {
    if (pedido.estado === true) {
      return "colorCard m-2"
    } else {
      return "bg-dark text-white m-2"
    }
  }

  const fechaformateada = formatearFecha(pedido.fecha)

  return (
    <Col xs={12} md={6} lg={6}>
      <Card className={manejadorColorCard()}>
        <Card.Header>
          <span className="d-flex justify-content-end">
            <Button variant="danger">
              <HiX className="fs-4" onClick={eliminarPedido}></HiX>
            </Button>
          </span>
          <h3 className="text-start">Pedido</h3>
        </Card.Header>
        <Card.Body>
          <h6>Nombre de Usuario: {usuario?.nombreUsuario}</h6>
          <h6>Fecha: {fechaformateada}</h6>
          <h6>Pedido:</h6>
          <ul className="ps-5">
            {pedido.productosDelMenu.map((idProducto, index) => (
              <li key={index}>{productos.map((productoDB) => {
                if (productoDB._id === idProducto) {
                  return productoDB.nombreProducto
                }
              })} - ${productos.map((productoDB) => {
                if (productoDB._id === idProducto) {
                  return productoDB.precio
                }
              })} </li>
            ))}
          </ul>
          <h6>Nota: {pedido.nota}</h6>
          <h6 className="text-end">Total: ${pedido.subTotal}</h6>
        </Card.Body>
        <Card.Footer className="justify-content-end d-flex">
          
          {verificarEstado()}

        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ItemPedido;
