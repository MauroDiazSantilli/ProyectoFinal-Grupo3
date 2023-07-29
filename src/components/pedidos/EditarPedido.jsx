import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { consultaEditarPedido, obtenerPedido } from "../../helpers/queries";

const EditarPedido = () => {
  const [productosDelMenu , setProductosDelMenu] = useState([])
  const [subTotal, setSubtotal] = useState([])
  const {id}= useParams();
  const navegacion = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();
  
  useEffect(()=>{
    obtenerPedido(id).then((respuesta)=>{
      setValue('usuario', respuesta.usuario)
      setValue('fecha', respuesta.fecha)
      setValue('estado', respuesta.estado)
      setValue('nota', respuesta.nota)
      setProductosDelMenu(respuesta.productosDelMenu)
      setSubtotal(respuesta.subTotal)
    })
  }, [])

  const onSubmit = (pedidoEditado) =>{
    const pedidoCompleto = {...pedidoEditado, productosDelMenu, subTotal}
    consultaEditarPedido(pedidoCompleto, id).then((respuesta)=>{
      if (respuesta) {
        if (respuesta.status === 200) {
          Swal.fire('Pedido actualizado', `El pedido: ${pedidoEditado.fecha} fue editado correctamente`, 'success');
          navegacion('/administrador/pedidos');
        }else{
          Swal.fire('Se produjo un error', `El pedido: ${pedidoEditado.fecha} no fue editado, intentelo mas tarde`, 'error');
        }
      } else{
        Swal.fire('Se produjo un error', `El pedido: ${pedidoEditado.fecha} no fue editado, intentelo mas tarde`, 'error');
      }
    })
  }

  return (
    <Container className="mainSection my-4 border rounded border-5 border-secondary admin-formulario text-white">
      <h1 className="display-4 text-center">Editar Pedido</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 disabled" controlId="formUsuario">
          <Form.Label className="fs-4">Usuario</Form.Label>
          <Form.Control type="text" disabled {...register("usuario")}></Form.Control>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formPedido">
          <Form.Label className="fs-4">Pedido</Form.Label>
          <Form.Control as="textarea" rows={3} disabled></Form.Control>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formFecha">
          <Form.Label className="fs-4">Fecha</Form.Label>
          <Form.Control type="text" disabled {...register("fecha")}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label className="fs-4">Estado*</Form.Label>
          <Form.Select
            aria-label="Estado"
            {...register("estado", { required: "Debe elegir una opcion" })}
          >
            <option value="">Seleccione una Categoria</option>
            <option value="pendiente">Pendiente</option>
            <option value="realizado">Realizado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.estado?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNota">
          <Form.Label className="fs-4">Nota*</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("nota", {
              minLength: {
                value: 2,
                message:
                  "La nota del pedido debe contener como mínimo 2 carácteres y debe empezar con la primera letra mayúscula",
              },
              maxLength: {
                value: 30,
                message: "La nota debe tener como máximo 30 carácteres",
              },
              pattern: {
                value: /^[A-Za-z\u00D1\u00F1][A-Za-z0-9:,.\s\u00D1\u00F1]{1,29}$/,
                message:
                  "La nota debe ser corta entre 2 y 30 carácteres (puede usar letras, numeros y signos de puntuacion",
              },
            })}
          ></Form.Control>
          <Form.Text className="text-danger">{errors.nota?.message}</Form.Text>
        </Form.Group>
        <Button type="submit" className="btn btn-warning mb-2">
          Guardar Cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarPedido;
