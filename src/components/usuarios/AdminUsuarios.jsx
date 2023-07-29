import ItemUsuario from "./ItemUsuario";
import { Container, Table } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { obtenerUsuarios } from "../../helpers/queries";
const AdminUsuarios = () => {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(()=>{
    obtenerUsuarios().then((respuesta)=>{
      if(respuesta)
      {
        setUsuarios(respuesta);
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
      <h1 className="display-4">Administrador de Usuarios</h1>
      <hr></hr>
      <section className="table-responsive">
        <Table bordered hover className="table-dark">
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Email</th>
              <th>Estado de la Cuenta</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios.map((usuario)=> <ItemUsuario key={usuario._id} usuario={usuario} setUsuarios={setUsuarios}></ItemUsuario>)
            }
          </tbody>
        </Table>
      </section>
    </Container>
  );
};

export default AdminUsuarios;
