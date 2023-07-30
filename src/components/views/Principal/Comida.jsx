import { Button, Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"


const Comida = ({ producto, setHayProductosEnPedido }) => {



  const agregarProductoAlPedido = (idProducto) => {

    const usuarioEnSession = JSON.parse(sessionStorage.getItem('usuario')) || null;
    if (usuarioEnSession) {
      Swal.fire({
        title: 'Estás seguro?',
        text: "Seguro que deseas agregar este producto al pedido?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro!',
        cancelButtonText: 'Cancelar',

      }).then((result) => {
        if (result.isConfirmed) {
          // Obtener el array actual de nombres de id de productos desde la sessionStorage
          const productosEnPedido = JSON.parse(sessionStorage.getItem("productosEnPedido")) || [];
          // Agregar el nuevo id de producto al array
          productosEnPedido.push(idProducto);
          setHayProductosEnPedido(true);
          // Guardar el array actualizado en la sessionStorage con la clave "productosEnPedido"
          sessionStorage.setItem("productosEnPedido", JSON.stringify(productosEnPedido));
          Swal.fire(
            'Agregado!',
            'El producto fue agregado con exito al pedido',
            'success'
          )
        }
      })
    } else {
      Swal.fire(
        'Alerta',
        'Debe loguearse para poder agregar productos al pedido',
        'warning'
      )
    }

  }

  const verificarDisponibilidad = () => {
    if (producto.estado === true) {
      return <Button id="btn-comida" className="btn w-100" type="button" onClick={() => agregarProductoAlPedido(producto._id)}>
        Agregar al pedido
      </Button>
    } else {
      return <Button id="btn-comida" className="btn w-100" type="button" disabled>
        Producto Agotado
      </Button>
    }
  }

  return (
    <Col className="mt-2">
      <Card className="h-100">
        <div className="row g-0">
          <div className="col-md-5">
            <Image
              src={producto.imagen}
              className="imagenCard w-100 rounded-start object-fit-cover h-100"
              alt={producto.nom}
            ></Image>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{producto.nombreProducto}</h5>
              <p className="card-text">
                {producto.detalle}
              </p>
              <h5 className="card-title" id="precio-comida">$ {producto.precio}</h5>
              <Link to={`/detalleProducto/${producto._id}`} id="btn-verdetalle" className="btn w-100 mb-2" >Ver detalle</Link>
              {verificarDisponibilidad()}
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default Comida;
