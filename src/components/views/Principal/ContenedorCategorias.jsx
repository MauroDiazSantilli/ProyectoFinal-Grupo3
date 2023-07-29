import { Table } from "react-bootstrap";
import Categoria from "./Categoria";

const ContenedorCategorias = ({setCategoriaBuscada}) => {
  return (
    <section className="table-responsive mt-3" id="categoria">
      <Table>
        <thead>
          <tr>
            <Categoria categoria="Todos"  setCategoriaBuscada={setCategoriaBuscada}></Categoria>
            <Categoria categoria="Sandwich"  setCategoriaBuscada={setCategoriaBuscada}></Categoria>
            <Categoria categoria="Al Plato"  setCategoriaBuscada={setCategoriaBuscada}></Categoria>
            <Categoria categoria="Pastas"  setCategoriaBuscada={setCategoriaBuscada}></Categoria>
            <Categoria categoria="Pizzas"  setCategoriaBuscada={setCategoriaBuscada}></Categoria>
            <Categoria categoria="Postres"  setCategoriaBuscada={setCategoriaBuscada}></Categoria>
            <Categoria categoria="Bebidas"  setCategoriaBuscada={setCategoriaBuscada}></Categoria>
          </tr>
        </thead>
      </Table>
    </section>
  );
};

export default ContenedorCategorias;
