import React from 'react';
import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap"
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerProducto } from "../../helpers/queries"
import Swal from 'sweetalert2';

const DetalleProducto = () => {

    const { id } = useParams()
    const [producto, setProducto] = useState({})

    useEffect(() => {
        obtenerProducto(id).then((respuesta) => {
            setProducto(respuesta)
        })

    }, [])

    const agregarProductoAlPedido = (idProducto) => {

        const usuarioEnSession = JSON.parse(sessionStorage.getItem('usuario')) || null;
        if(usuarioEnSession){
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
              // Guardar el array actualizado en la sessionStorage con la clave "productosEnPedido"
              sessionStorage.setItem("productosEnPedido", JSON.stringify(productosEnPedido));
              Swal.fire(
                'Agregado!',
                'El producto fue agregado con exito al pedido',
                'success'
              )
            }
          })
        } else{
          Swal.fire(
            'Alerta',
            'Debe loguearse para poder agregar productos al pedido',
            'warning'
          )
        }
        
      }

    return (
        <Container className='mainSection my-3'>

            <h2>Detalle del producto</h2>
            <hr />
            <Row className="m-4">
                <Col xs={12} lg={6} className="text-center " >
                    <img src={producto.imagen} alt="imagen de milanesa con pure" className="w-100" />
                </Col>
                <Col xs={12} lg={6} >
                    <article className="p-2 py-md-0">
                        <h3>{producto.nombreProducto}</h3>
                        <hr />
                        <p className="fw-bold ">Categoria: <span className="fw-normal">{producto.categoria}</span></p>
                        <p className="fw-bold ">Detalle: <span className="fw-normal"> {producto.detalle}</span></p>

                        <p className="fw-bold">Precio: <span className="fw-normal">${producto.precio}</span></p>
                        <Button id="btn-comida" className="btn w-100" type="button" onClick={() => agregarProductoAlPedido(producto.id)}>
                            Agregar al pedido
                        </Button>

                    </article>
                </Col>
            </Row>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Volver a la página principal</Breadcrumb.Item>
            </Breadcrumb>
        </Container>
    );
};

export default DetalleProducto;