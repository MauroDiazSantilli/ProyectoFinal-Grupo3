import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import {Card, Form, Button } from 'react-bootstrap';

const RegistroUsuarios = () => {
    return (
    <Container className="mainSection">
        <Card className="my-5 cardPrincipal">
            <Card.Header as="h5" className='headLine'>Registro</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el nombre de usuario" />
                    <Form.Text className="text-danger">
                    </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese el email" />
                    <Form.Text className="text-danger">
                    </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Mayor a 8 caracteres, debe tener una mayuscula y numeros" />
                    <Form.Text className="text-danger">
                    </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" className='botonRegistrar'
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#654321")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#8c7851")}>
                    Registrar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </Container>
    );
};

export default RegistroUsuarios;