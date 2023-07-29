import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaSquareXmark, FaPenToSquare } from "react-icons/fa6";
import { borrarUsuario, obtenerUsuarios } from "../../helpers/queries";
import Swal from "sweetalert2";

const ItemUsuario = ({usuario, setUsuarios}) => {

  const eliminarUsuario = () => {
    Swal.fire({
      title: "¿Esta seguro de eliminar el usuario?",
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
        borrarUsuario(usuario.id).then((respuesta) => {
          if (respuesta.status === 200) {
            Swal.fire(
              "Usuario Eliminado",
              `El usuario ${usuario.nombreUsuario} fue eliminado`,
              "success"
            );
            obtenerUsuarios().then((respuesta) => {
            setUsuarios(respuesta);
            })
          } else {
            Swal.fire("Se produjo un error", "Intentelo mas tarde", "error");
          }
        });
      }
    });
  }


  console.log(usuario.estado)
  return (
    <tr>
      <td>{usuario.nombreUsuario}</td>
      <td>{usuario.email}</td>
      <td>{usuario.estado === true? "Habilitado" : "Suspendido"}</td>
      <td>
        <Link
          className="btn btn-warning mb-2 mb-md-0"
          to={`/administrador/usuarios/editar/${usuario.id}`}
        >
          <FaPenToSquare className="fs-4"></FaPenToSquare>
        </Link>
        <Button className="ms-md-2" variant="danger">
          <FaSquareXmark className="fs-4" onClick={eliminarUsuario}></FaSquareXmark>
        </Button>
      </td>
    </tr>
  );
};

export default ItemUsuario;
