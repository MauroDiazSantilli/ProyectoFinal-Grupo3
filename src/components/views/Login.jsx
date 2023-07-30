import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import {Card, Form, Button } from 'react-bootstrap';
import '../../Registro.css';
import { login } from "../../helpers/queries.js"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate();

  const onSubmit = (usuario) => {
    login(usuario).then((respuesta) => {
      if (respuesta) {
        if (respuesta !== "") {
          const usuarioSinAdmin = { ...respuesta};
          console.log(usuarioSinAdmin)
          if(usuarioSinAdmin.estado === true){
          sessionStorage.setItem("usuario", JSON.stringify(usuarioSinAdmin));
          setUsuarioLogueado(usuarioSinAdmin);
          Swal.fire("Bienvenido", "Ha ingresado correctamente", "success");
          navegacion("/");
          } else{
            Swal.fire("Error", "Usuario suspendido, por favor comuniquese con el adminsitrador para solucionar el inconveniente. Gracias.", "error");
          }
        } else {
          Swal.fire("Error", "Contraseña incorrecta", "error");
        }
      } else {
        Swal.fire("Error", "Email incorrecto", "error");
      }
    });
  };

    return (
    <Container className="mainSection">
        <Card className="my-5 cardPrincipal">
            <Card.Header as="h5" className='headLine'>Iniciar sesion</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese un email" {
                    ...register('email',{
                  required: 'El email es obligatorio',
                  pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'El email debe contener @ y terminar . com/es/com.ar u otra terminacion'
                  }
                })
              } />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese una contraseña" {
                ...register('password',{
                  required: 'La contraseña es obligatoria',
                  pattern:{
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message: 'El password debe contener 8 caracteres (al menos 1 letra mayúscula, 1 letra minúscula y 1 numero) también puede incluir carácteres especiales'
                  }
                })
              } />
               <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

                    <Button variant="primary" type="submit" className='botonRegistrar'
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#654321")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#8c7851")}>
                    Ingresar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </Container>
    );
};

export default Login;