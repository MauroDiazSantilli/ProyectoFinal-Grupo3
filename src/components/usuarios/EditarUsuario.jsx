import React from 'react';
import { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { consultaEditarUsuario, obtenerUsuario } from "../../helpers/queries";

const EditarUsuario = () => {
  const {id} = useParams();
  const navegacion = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(()=>{
    obtenerUsuario(id).then((respuesta)=>{
      if(respuesta.estado === true){
        respuesta.estado = "habilitada"
      } else{
        respuesta.estado = "suspendida"
      }
      if(respuesta.isAdmin === true){
        respuesta.isAdmin = "administrador"
      } else{
        respuesta.isAdmin = "cliente"
      }
      setValue('nombreUsuario', respuesta.nombreUsuario);
      setValue('email', respuesta.email);
      setValue('password', respuesta.password)
      setValue('estado', respuesta.estado);
      setValue('isAdmin', respuesta.isAdmin);
    })
  }, [])

  const onSubmit = (usuarioEditado) =>{
    usuarioEditado.estado = usuarioEditado.estado === "habilitada" ? true : false;
    usuarioEditado.isAdmin = usuarioEditado.isAdmin === "administrador" ? true : false;

    consultaEditarUsuario(usuarioEditado, id).then((respuesta)=>{
        if (respuesta) {
            if (respuesta.status === 200) {
                Swal.fire('Usuario actualizado', `El Usuario: ${usuarioEditado.nombreUsuario} fue editado correctamente`, 'success');
                navegacion('/administrador/usuarios');
            }else{
                Swal.fire('Se produjo un error', `El Usuario: ${usuarioEditado.nombreUsuario} no fue editado, intentelo mas tarde`, 'error');
            }
        }else{
            Swal.fire('Se produjo un error', `El Usuario: ${usuarioEditado.nombreUsuario} no fue editado, intentelo mas tarde`, 'error');
        }  
    })
  }

  return (
    <Container className="mainSection my-4 border rounded border-5 border-secondary admin-formulario text-white">
      <h1 className="display-4 text-center">Editar Usuario</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 disabled" controlId="formUsuario">
          <Form.Label className="fs-4">Nombre de Usuario</Form.Label>
          <Form.Control type="text" disabled {...register("nombreUsuario")}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 disabled" controlId="formUsuario">
          <Form.Label className="fs-4">Email</Form.Label>
          <Form.Control type="text" disabled {...register("email")}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEstado">
          <Form.Label className="fs-4">Estado de la cuenta*</Form.Label>
          <Form.Select
            aria-label="Estado"
            {...register("estado", { required: "Debe elegir una opcion" })}
          >
            <option value="">Seleccione el estado de la cuenta</option>
            <option value="habilitada">Habilitada</option>
            <option value="suspendida">Suspendida</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.estado?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPerfil">
          <Form.Label className="fs-4">Perfil del Usuario*</Form.Label>
          <Form.Select
            aria-label="Perfil"
            {...register("isAdmin", { required: "Debe elegir una opcion" })}
          >
            <option value="">Seleccione el perfil del usuario</option>
            <option value="cliente">Cliente</option>
            <option value="administrador">Administrador</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.isAdmin?.message}
          </Form.Text>
        </Form.Group>

        <Button type="submit" className="btn btn-warning mb-2">
          Guardar Cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarUsuario;
