import { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { obtenerPedidos } from "../../helpers/queries";
import ItemPedido from "./ItemPedido";

const AdminPedidos = () => {

  const [pedidos, setPedidos] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [realizados, setRealizados] = useState([]);


  useEffect(() => {
    obtenerPedidos().then((respuesta) => {
      setPedidos(respuesta);
    })
  }, [])

  useEffect(() => {
    const pedidosPendientes = pedidos.filter((pedido) => pedido.estado === "pendiente");
    const pedidosRealizados = pedidos.filter((pedido) => pedido.estado === "realizado");
    setPendientes(pedidosPendientes);
    setRealizados(pedidosRealizados);
  }, [pedidos]);

  const actualizarPedidos = () => {
    obtenerPedidos().then((respuesta) => {
      setPedidos(respuesta); // Actualiza el estado de pedidos con los pedidos actualizados
    });
  };

  return (
    <Container className="mainSection my-4">
      <h1 className="display-4">Administrador de Pedidos</h1>
      <hr></hr>
      <h2>Pedidos Pendientes</h2>
      {pendientes.length === 0 ? ( // Verifica si no hay pedidos pendientes
        <h3>No hay pedidos pendientes</h3>
      ) : (
        <Row>
          {pendientes.map((pedido) => (
            <ItemPedido
              key={pedido.id}
              pedido={pedido}
              setPedidos={setPedidos}
              actualizarPedidos={actualizarPedidos}
            />
          ))}
        </Row>
      )}
      <hr></hr>
      <h2>Pedidos Realizados</h2>
      {realizados.length === 0 ? ( // Verifica si no hay pedidos realizados
        <h3>No hay pedidos realizados</h3>
      ) : (
        <Row>
          {realizados.map((pedido) => (
            <ItemPedido
              key={pedido.id}
              pedido={pedido}
              setPedidos={setPedidos}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AdminPedidos;
