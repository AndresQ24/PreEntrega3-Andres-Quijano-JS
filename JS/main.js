//PROYECTO CON DOM:

let cancionesDiv = document.getElementById("canciones");
let guardarCancionBtn = document.getElementById("guardarCancionBtn");
let inputBuscador = document.querySelector("#buscador");
let coincidencia = document.getElementById("coincidencia");
let selectOrden = document.getElementById("selectOrden");
let botonCarrito = document.getElementById("botonCarrito");
let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let precioTotal = document.getElementById("precioTotal");

let productosEnCarrito;
if (localStorage.getItem("carrito")) {
  productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  productosEnCarrito = [];
  localStorage.setItem("carrito", productosEnCarrito);
}

//FUNCTIONS PROYECTO DOM
//imprimiendo los objetos en el DOM
function verCatalogo(array) {
  //antes que se vuelva a imprimir, se resetea el div
  cancionesDiv.innerHTML = "";

  for (let cancion of array) {
    //código para imprimir el array
    //creamos un div padre de la card
    let nuevaCancionDiv = document.createElement("div");
    nuevaCancionDiv.className = "col-12 col-md-6 col-lg-4 my-3";
    nuevaCancionDiv.innerHTML = `
        <div id="${cancion.id}" class="card" style="width: 28rem;">
            <img class="card-img-top img-fluid" style="height: 250px;"src="assets/${
              cancion.imagen
            }" alt="${cancion.nombreCancion} de ${cancion.artista}">
            <div class="card-body">
                <h4 class="card-title">${cancion.nombreCancion}</h4>
                <p>Autor: ${cancion.artista}</p>
                <p class="${cancion.precio <= 400 && "ofertaLibro"}">Precio: ${
      cancion.precio
    }</p>
                <button id="agregarBtn${
                  cancion.id
                }" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div> 
        `;
    cancionesDiv.appendChild(nuevaCancionDiv);
    let agregarBtn = document.getElementById(`agregarBtn${cancion.id}`);
    agregarBtn.onclick = () => {
      agregarAlCarrito(cancion);
    };
  }
}

function agregarAlCarrito(cancion) {
  // console.log(libro)
  console.log(
    `La cancion ${cancion.nombreCancion} de ${cancion.artista} ha sido agregada al carrito y vale ${cancion.precio}`
  );
  //sumarlo a productosEnCarrito
  productosEnCarrito.push(cancion);
  //setearlo en storage
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  console.log(productosEnCarrito);
  //evaluar si ya existe o no el producto
}

function cargarCancion(array) {
  let inputNombreCancion = document.getElementById("cancionInput");
  let inputArtista = document.getElementById("artistaInput");
  let inputPrecio = document.getElementById("precioInput");

  //hacerlo con la function constructora
  const nuevaCancion = new Cancion(
    array.length + 1,
    inputNombreCancion.value,
    inputArtista.value,
    parseInt(inputPrecio.value),
    "Vinilo (1).jpg"
  );
  console.log(nuevaCancion);

  //pushearlo o sumarlo al array
  array.push(nuevaCancion);
  //guardar en storage:
  localStorage.setItem("bibliotecaDeCanciones", JSON.stringify(array));
  verCatalogo(array);
  let formAgregarCancion = document.getElementById("formAgregarCancion");

  formAgregarCancion.reset();

  //agregado Toastify:
  Toastify({
    text: `La cancion ${nuevaCancion.nombreCancion} de ${nuevaCancion.artista} ha sido agregada al stock`,
    duration: 2500,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "black",
    },
  }).showToast();
}

function buscarInfo(buscado, array) { 
  let busquedaArray = array.filter(
    (cancion) =>
      cancion.nombreCancion.toLowerCase().includes(buscado.toLowerCase()) ||
      cancion.artista.toLowerCase().includes(buscado.toLowerCase())
  );

  busquedaArray.length == 0
    ? ((coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`),
      verCatalogo(busquedaArray))
    : ((coincidencia.innerHTML = ""), verCatalogo(busquedaArray));
}
function cargarProductosCarrito(array) {
  console.log("Funciona btn render carrito");
  modalBodyCarrito.innerHTML = "";
  array.forEach((productoCarrito) => {
    modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.nombreCancion}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.artista}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
        `;
  });
  //segundo forEach agregar function eliminar
  array.forEach((productoCarrito) => {
    document
      .getElementById(`botonEliminar${productoCarrito.id}`)
      .addEventListener("click", () => {
        
        //borrar del DOM
        let cardProducto = document.getElementById(
          `productoCarrito${productoCarrito.id}`
        );
        cardProducto.remove();
        //eliminar del array
        //busco prod a eliminar
        let productoEliminar = array.find(
          (cancion) => cancion.id == productoCarrito.id
        );
        console.log(productoEliminar);
        //busco el indice
        let posicion = array.indexOf(productoEliminar);
        console.log(posicion);
        //splice (posicion donde trabajar, cant de elementos a eliminar)
        array.splice(posicion, 1);
        console.log(array);
        //eliminar storage (volver a setear)
        localStorage.setItem("carrito", JSON.stringify(array));
        //recalcular total
        compraTotal(array);
      });
  });
  compraTotal(array);
}
function agregarAlCarrito(cancion) {
  console.log(cancion);
  //evaluar si ya existe o no el producto
  let cancionAgregada = productosEnCarrito.find((elem) => elem.id == cancion.id);
  if (cancionAgregada == undefined) {
    console.log(
      `La cancion ${cancion.nombreCancion} de ${cancion.artista} ha sido agregado al carrito y vale ${cancion.precio}`
    );
    //sumarlo a productosEnCarrito
    productosEnCarrito.push(cancion);
    //setearlo en storage
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    // console.log(productosEnCarrito)
    //sweetalert para experiencia de usuario
    Swal.fire({
      title: "Ha agregado un producto :D",
      text: `La cancion ${cancion.nombreCancion} de ${cancion.artista} ha sido agregada`,
      icon: "info",
      confirmButtonText: "Gracias!",
      confirmButtonColor: "green",
      //milisegundo por medida
      timer: 3000,
      //para img
      imageUrl: `assets/${cancion.imagen}`,
      imageHeight: 200,
    });
  } else {
    //el producto ya se encuentra
    console.log(
      `La cancion ${cancion.nombreCancion} de ${cancion.artista} ya se encuentra en el carrito`
    );
    //OTRA OPCION: logica que acumule cantidad
    //que me avise que ya está en el carrito
    Swal.fire({
      text: `La cancion ${cancion.nombreCancion} de ${cancion.artista} ya existe en el carrito`,
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}
function compraTotal(array) {
  // reduce
  // let acumulador = 0
  // for(let book of array){
  //     acumulador = acumulador + book.precio
  // }

  //acumulador con reduce
  let total = array.reduce(
    (acc, productoCarrito) => acc + productoCarrito.precio,
    0
  );
  console.log("Acc con reduce " + total);
  //ternario para mostrar en el html
  total == 0
    ? (precioTotal.innerHTML = `No hay productos agregados`)
    : (precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`);
  return total;
}
//functions ordenar:
function ordenarMenorMayor(array) {
  //copia array original, para no modificar estanteria
  const menorMayor = [].concat(array);
  menorMayor.sort((param1, param2) => param1.precio - param2.precio);
  verCatalogo(menorMayor);
}

function ordenarMayorMenor(array) {
  //array que recibe y lo copia
  const mayorMenor = [].concat(array);
  mayorMenor.sort((a, b) => b.precio - a.precio);
  verCatalogo(mayorMenor);
}

function ordenarAlfabeticamenteArtista(array) {
  const ordenadoAlfabeticamente = [].concat(array);
  //ordenar algo que tiene un dato string
  //forma de la a-z ascendente
  ordenadoAlfabeticamente.sort((a, b) => {
    if (a.artista > b.artista) {
      return 1;
    }
    if (a.artista < b.artista) {
      return -1;
    }
    // a es igual b
    return 0;
  });
  verCatalogo(ordenadoAlfabeticamente);
}

function ordenarAlfabeticamenteCancion(array) {
  const ordenadoAlfabeticamente = [].concat(array);
  //ordenar algo que tiene un dato string
  //forma de la a-z ascendente
  ordenadoAlfabeticamente.sort((a, b) => {
    if (a.nombreCancion > b.nombreCancion) {
      return 1;
    }
    if (a.nombreCancion < b.nombreCancion) {
      return -1;
    }
    // a es igual b
    return 0;
  });
  verCatalogo(ordenadoAlfabeticamente);
}

//EVENTOS:
guardarCancionBtn.addEventListener("click", () => {
  cargarCancion(bibliotecaDeCanciones);
});

//por cada evento, averiguar su funcionamiento, luego pasarle function con instrucciones a realizar
inputBuscador.addEventListener("input", () => {
  buscarInfo(inputBuscador.value.toLowerCase(), bibliotecaDeCanciones);
});
//select para ordenar
selectOrden.addEventListener("change", () => {
  // console.log(selectOrden.value)
  if (selectOrden.value == "1") {
    ordenarMayorMenor(bibliotecaDeCanciones);
  } else if (selectOrden.value == "2") {
    ordenarMenorMayor(bibliotecaDeCanciones);
  } else if (selectOrden.value == "3") {
    ordenarAlfabeticamenteArtista(bibliotecaDeCanciones);
  }else if (selectOrden.value == "4") {
    ordenarAlfabeticamenteCancion(bibliotecaDeCanciones);
  } else {
    verCatalogo(bibliotecaDeCanciones);
  }
});

botonCarrito.addEventListener("click", () => {
  cargarProductosCarrito(productosEnCarrito);
});
//CODIGO:
verCatalogo(bibliotecaDeCanciones);

//Luxon - libreria tres:
const DateTime = luxon.DateTime;

const fechaHoy = DateTime.now();
let fecha = document.getElementById("fecha");
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
fecha.innerHTML = `${fechaMostrar}`;
