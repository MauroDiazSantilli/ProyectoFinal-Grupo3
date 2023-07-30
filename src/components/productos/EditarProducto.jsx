import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { consultaeditarProducto, obtenerProducto } from "../../helpers/queries";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const EditarProducto = () => {

  const {id}= useParams();
  const navegacion = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(()=>{
    obtenerProducto(id).then((respuesta)=>{
      if(respuesta.estado === true){
        respuesta.estado = "disponible"
      } else{
        respuesta.estado = "agotado"
      }
      setValue('nombreProducto', respuesta.nombreProducto)
      setValue('precio', respuesta.precio)
      setValue('categoria', respuesta.categoria)
      setValue('imagen', respuesta.imagen)
      setValue('detalle', respuesta.detalle)
      setValue('estado', respuesta.estado);
      setValue('cantidad', respuesta.cantidad)
    })
  }, [])

  const onSubmit = (productoEditado) =>{
    productoEditado.estado = productoEditado.estado === "disponible" ? true : false;

    consultaeditarProducto(productoEditado, id).then((respuesta)=>{
      if (respuesta) {
        if (respuesta.status === 200) {
          Swal.fire('Producto actualizado', `El producto: ${productoEditado.nombreProducto} fue editado correctamente`, 'success');
          navegacion('/administrador/productos');
        }else{
          Swal.fire('Se produjo un error', `El producto: ${productoEditado.nombreProducto} no fue editado, intentelo mas tarde`, 'error');
        }
      } else{
        Swal.fire('Se produjo un error', `El producto: ${productoEditado.nombreProducto} no fue editado, intentelo mas tarde`, 'error');
      }
    })
  }

  return (
    <Container className="mainSection my-4 border rounded border-5 border-secondary admin-formulario text-white">
      <h1 className="display-4 text-center">Editar Producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formProducto">
          <Form.Label className="fs-4">Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Milanesa con Papas Fritas"
            {...register("nombreProducto", {
              required: "El nombre del producto es obligatorio",
              minLength: {
                value: 2,
                message:
                  "El nombre del producto debe contener como mínimo 2 carácteres",
              },
              maxLength: {
                value: 50,
                message:
                  "El nombre del producto debe contener como máximo 50 carácteres",
              },
              pattern: {
                value: /^[A-Z\u00D1][A-ZÁ-Úa-zá-ú\s0-9\u00F1\u00D1]{1,49}$/,
                message:
                  "El nombre del producto debe comenzar con letra mayúscula además solo puede contener letras y numeros entre 2 y 50 carácteres",
              },
            })}
          ></Form.Control>
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label className="fs-4">Precio*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 2500"
            {...register("precio", {
              required: "El nombre del producto es obligatorio",
              min: {
                value: 1,
                message: "El precio minimo es 1",
              },
              max: {
                value: 30000,
                message: "El precio máximo es 30.000",
              },
              pattern: {
                value: /[0-9]{1,5}$/,
                message: "El precio solo puede contener números",
              },
            })}
          ></Form.Control>
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label className="fs-4">Categoria*</Form.Label>
          <Form.Select
            aria-label="Categoria"
            {...register("categoria", { required: "Debe elegir una opcion" })}
          >
            <option value="">Seleccione una Categoria</option>
            <option value="pastas">Pastas</option>
            <option value="sandwich">Sandwich</option>
            <option value="pizzas">Pizzas</option>
            <option value="postres">Postres</option>
            <option value="bebidas">Bebidas</option>
            <option value="al plato">Al Plato</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label className="fs-4">Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/KRMQHXYYBFBI5KRDXUYY5AXH2A.jpg"
            {...register("imagen", {
              required:
                "La URL de la Imagen es obligatoria y debe terminar con .jpg/.png/.svg/.jpeg/.webp",
              minLength: {
                value: 1,
                message:
                  "La URL de la Imagen Imagen del Producto debe contener como mínimo 1 carácter",
              },
              pattern: {
                value: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|svg|webp)$/,
                message:
                  "La URL de la Imagen debe terminar con .jpg/.png/.svg/.jpeg/.webp",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDetalle">
          <Form.Label className="fs-4">Detalle*</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("detalle", {
              required: "El detalle del producto es obligatorio",
              minLength: {
                value: 8,
                message:
                  "El detalle del Producto debe contener como mínimo 8 carácteres debe empezar con la primera letra mayúscula",
              },
              maxLength: {
                value: 150,
                message:
                  "El detalle del Producto debe contener como máximo 150 carácteres",
              },
              pattern: {
                value: /^(?=.*[A-Z])[A-Za-zÁÉÍÓÚáéíóúÑñ0-9:,.\s]{7,199}$/,
                message:
                  "El detalle del producto debe comenzar con mayúscula y debe contener como mínimo 8 carácteres y como máximo 150 carácteres (puede usar letras, números y signos de puntuación)",
              },
            })}
          ></Form.Control>
          <Form.Text className="text-danger">
            {errors.detalle?.message}
          </Form.Text>
        </Form.Group>

         <Form.Group className="mb-3" controlId="formEstado">
          <Form.Label className="fs-4">Estado del producto*</Form.Label>
          <Form.Select
            aria-label="Estado"
            {...register("estado", { required: "Debe elegir una opcion" })}
          >
            <option value="">Seleccione el estado del producto</option>
            <option value="disponible">Disponible</option>
            <option value="agotado">Agotado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.estado?.message}
          </Form.Text>
        </Form.Group>

        <Button type="submit" className="btn btn-warning mb-2">
          Editar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default EditarProducto;
