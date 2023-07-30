import { Button } from "react-bootstrap";

const Categoria = ({categoria , setCategoriaBuscada}) => {
  
  const filtroCategoria = () =>{
    const categoriaMinuscula = categoria.toLowerCase();
    setCategoriaBuscada(categoriaMinuscula)
  }
  
  return (
    <th className="bg-secondary">
      <Button className="categoria my-4 d-flex justify-content-center" onClick={filtroCategoria}>
        <span>{categoria}</span>
      </Button>
    </th>
  );
};

export default Categoria;
