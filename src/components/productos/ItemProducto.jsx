import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaSquareXmark, FaPenToSquare } from "react-icons/fa6";
import { borrarProducto, obtenerProductos } from "../../helpers/queries";
import Swal from "sweetalert2";

const ItemProducto = ({ producto, setProductos }) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "¿Esta seguro de eliminar el producto?",
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
        borrarProducto(producto._id).then((respuesta) => {
          if (respuesta.status === 200) {
            Swal.fire(
              "Producto Eliminado",
              `El producto ${producto.nombreProducto} fue eliminado`,
              "success"
            );
            obtenerProductos().then((respuesta) => {
              setProductos(respuesta);
            });
          } else {
            Swal.fire("Se produjo un error", "Intentelo mas tarde", "error");
          }
        });
      }
    });
  };

  return (
    <tr>
      <td>{producto.nombreProducto}</td>
      <td>{producto.precio}</td>
      <td>{producto.estado === true? "Disponible":"Agotado"}</td>
      <td>{producto.categoria}</td>
      <td>
        <Link
          className="btn btn-warning mb-2 mb-md-0"
          to={`/administrador/productos/editar/${producto._id}`}
        >
          <FaPenToSquare className="fs-4"></FaPenToSquare>
        </Link>
        <Button className="ms-md-2" variant="danger">
          <FaSquareXmark
            className="fs-4"
            onClick={eliminarProducto}
          ></FaSquareXmark>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
