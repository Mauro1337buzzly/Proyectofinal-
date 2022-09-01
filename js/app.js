class Producto {
  constructor(nombre, precio, talle, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.talle = talle;
    this.id = id;
  }
}

let carrito = [];

/*funcion para mostrar el total de la compra*/
function precioTotalCarrito() {
  return carrito.reduce((total, producto) => (total += producto.precio), 0);
}

/*guarda datos en el local storage*/
function guardarDatos () { 
  sessionStorage.setItem("carrito", JSON.stringify(carrito))
};

/*pide los datos para luego pintarlos en el dom*/
function getDatos () {
  let datosGuardados = JSON.parse(sessionStorage.getItem("carrito"))
  if(datosGuardados != undefined){
    carrito.push(...datosGuardados);
    pintarCarrito();
  }  
}

/*Pintar el carrito con los productos que se muestran*/
function pintarCarrito() {
  const tablaCarrito = document.getElementById("tablaCarrito");
  tablaCarrito.innerText = "";
  carrito.forEach((producto) => {
    tablaCarrito.innerHTML += `
    <tr>
      <td>${producto.nombre}</td>
      <td>${producto.talle}</td>
      <td>${producto.precio}</td>
      <td><a href="#" class="btnDel  btn btn-primary">Borrar</a></td>
    </tr>
    `

  });
  
  const btnDelete = document.querySelectorAll(".btnDel");

  
  btnDelete.forEach((btn, index) => {
    btn.addEventListener("click", () => { 
        carrito.splice(index, 1);
        guardarDatos();
        pintarCarrito();
       }) 
        });
}

//llamada al json para pintar en el dom
const contGrid = document.getElementById("contGrid");
fetch("./productos/productos.json")
  .then((response) => response.json())
  .then((productos) => {
    productos.forEach((producto, index) => {
      contGrid.innerHTML += `
  <div class="card" style="width: 18rem;">
  <img src=${producto.img} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">${producto.precio}$</p>
    <a href="#" class="btnAdd  btn btn-primary">Comprar</a>
  </div>
</div>
    `;
      const btnComprar = document.querySelectorAll(".btnAdd");


      btnComprar.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          let productoFind = productos.find((producto) => producto.id == index);

          let productoEnCarrito = carrito.find((producto) => producto.id == productoFind.id )
          if(productoEnCarrito == undefined){ 
            carrito.push(productoFind)
            guardarDatos();
            pintarCarrito();
           } else {
            Swal.fire({
              title: "Alerta",
              text: "Su producto ya ha sido agregado al carrito",
              icon: "warning",
              iconColor: "#FF8B00",
              confirmButtonText: "Aceptar",
            });
           }
        })
      });
      
    });
  });

  getDatos();

  let bntComprarTodo = document.getElementById("btnComprarTodo");

  bntComprarTodo.addEventListener("click", () => {
    if(carrito.length > 0 ) {

      let compraSuccess = "Su compra ha sido exitosa, el total es de :"+precioTotalCarrito();
      Swal.fire('Gracias', compraSuccess, 'success')
    }
  })



