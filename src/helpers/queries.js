const URL_PRODUCTO = import.meta.env.VITE_API_PRODUCTO
const URL_USUARIO = import.meta.env.VITE_API_USUARIO
const URL_PEDIDOS = import.meta.env.VITE_API_PEDIDOS


export const login = async (usuario) => {
  try {
    const respuesta = await fetch(URL_USUARIO);
    const listaUsuarios = await respuesta.json();
    const usuarioBuscado = listaUsuarios.find(
      (itemUsuario) => itemUsuario.email === usuario.email
    );
    if (usuarioBuscado) {
      if (usuarioBuscado.password === usuario.password) {
        return usuarioBuscado;
      } else {
        return "";
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const obtenerUsuarios = async()=>{
  try {
      const respuesta = await fetch(URL_USUARIO)
      const listaUsuarios = await respuesta.json();
      return listaUsuarios;
  } catch (error) {
      console.log(error);
  }
}

export const obtenerUsuario = async(id)=>{
  try {
      const respuesta = await fetch(`${URL_USUARIO}/${id}`)
      const usuario = await respuesta.json();
      return usuario;
  } catch (error) {
      console.log(error);
  }
}

export const crearUsuario = async (usuario) => {
  try {
    const respuesta = await fetch(URL_USUARIO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

  export const consultaCrearUsuario = async (usuario) => {
    try {
      const { isAdmin, ...usuarioSinAdmin } = usuario;
      const respuesta = await fetch(URL_USUARIO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioSinAdmin),
      });
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };

  export const consultaEditarUsuario = async(usuario, id)=>{
    try {
        const respuesta = await fetch(`${URL_USUARIO}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
  }

  export const obtenerProductos = async()=>{
    try {
        const respuesta = await fetch(URL_PRODUCTO)
        const listaProductos = await respuesta.json();
        return listaProductos;
    } catch (error) {
        console.log(error);
    }
  }
  
  export const obtenerProducto = async(id)=>{
    try {
        const respuesta = await fetch(`${URL_PRODUCTO}/${id}`)
        const producto = await respuesta.json();
        return producto;
    } catch (error) {
        console.log(error);
    }
  }
  
  
export const crearProducto = async (producto) => {
    try {
        const respuesta = await fetch(URL_PRODUCTO,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
        return respuesta
    } catch (error) {
        console.log(error)
    }
}

export const consultaeditarProducto = async(producto, id)=>{
  try {
      const respuesta = await fetch(`${URL_PRODUCTO}/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(producto)
      });
      return respuesta;
  } catch (error) {
      console.log(error);
  }
}

export const borrarProducto = async (id) => {
    try {
        const respuesta = await fetch(`${URL_PRODUCTO}/${id}`,{
            method: "DELETE"
        });
        return respuesta
    } catch (error) {
        console.log(error)
    }
}
export const borrarUsuario = async (id) => {
    try {
        const respuesta = await fetch(`${URL_USUARIO}/${id}`,{
            method: "DELETE"
        });
        return respuesta
    } catch (error) {
        console.log(error)
    }
}

export const borrarPedido = async (id) => {
  try {
      const respuesta = await fetch(`${URL_PEDIDOS}/${id}`,{
          method: "DELETE"
      });
      return respuesta
  } catch (error) {
      console.log(error)
  }
}

export const obtenerPedidos = async()=>{
  try {
      const respuesta = await fetch(URL_PEDIDOS)
      const listaPedidos = await respuesta.json();
      return listaPedidos;
  } catch (error) {
      console.log(error);
  }
}

export const obtenerPedido = async(id)=>{
  try {
      const respuesta = await fetch(`${URL_PEDIDOS}/${id}`)
      const pedido = await respuesta.json();
      return pedido;
  } catch (error) {
      console.log(error);
  }
}

export const crearPedido = async (pedido) => {
  try {
      const respuesta = await fetch(URL_PEDIDOS,{
          method: "POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify(pedido)
      });
      return respuesta
  } catch (error) {
      console.log(error)
  }
}

export const consultaEditarPedido = async(pedido, id)=>{
  try {
      const respuesta = await fetch(`${URL_PEDIDOS}/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(pedido)
      });
      return respuesta;
  } catch (error) {
      console.log(error);
  }
}
