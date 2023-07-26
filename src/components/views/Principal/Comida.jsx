import { Button, Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"


const Comida = ({ producto }) => {

  const agregarProductoAlPedido = (nombreProducto) => {

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
        // Obtener el array actual de nombres de productos desde la sessionStorage
        const productosEnPedido = JSON.parse(sessionStorage.getItem("productosEnPedido")) || [];
        // Agregar el nuevo nombre de producto al array
        productosEnPedido.push(nombreProducto);
        // Guardar el array actualizado en la sessionStorage con la clave "productosEnPedido"
        sessionStorage.setItem("productosEnPedido", JSON.stringify(productosEnPedido));
        console.log(productosEnPedido);
        Swal.fire(
          'Agregado!',
          'El producto fue agregado con exito al pedido',
          'success'
        )
      }
    })
  }

  return (
    <Col className="mt-2">
      <Card className="h-100">
        <div className="row g-0">
          <div className="col-md-5">
            <Image
              src={producto.imagen}
              className="imagenCard w-100 rounded-start object-fit-cover"
              alt="..."
            ></Image>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{producto.nombreProducto}</h5>
              <p className="card-text">
                {producto.detalle}
              </p>
              <h5 className="card-title" id="precio-comida">$ {producto.precio}</h5>
              <Link to={`/detalleProducto/${producto.id}`} id="btn-verdetalle" className="btn w-100 mb-2" >Ver detalle</Link>
              <Button id="btn-comida" className="btn w-100" type="button" onClick={() => agregarProductoAlPedido(producto.nombreProducto)}>
                Agregar al pedido
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default Comida;
