//class constructora
class Cancion {
  constructor(id, nombreCancion, artista, precio, imagen) {
    //propiedades o atributos de nuestra clase
    (this.id = id),
      (this.nombreCancion = nombreCancion),
      (this.artista = artista),
      (this.precio = precio),
      (this.imagen = imagen),
      (this.cantidad = 1);
  }
  //métodos
  mostrarInfoCancion() {
    console.log(
      `La cancion se llama ${this.cancion} y el autor es ${this.artista} con un precio de ${this.precio}`
    );
  }
  sumarUnidad() {
    this.cantidad += 1;
  }
  restarUnidad() {
    this.cantidad += 1;
  }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

const cancion1 = new Cancion(
  1,
  "Sola con mi voz",
  "Blanco palamera",
  200,
  "BP.jpg"
);

const cancion2 = new Cancion(
  2,
  "Cruel World",
  "Active Child",
  500,
  "ActiveChild2.jpg"
);

const cancion3 = new Cancion(
  3,
  "Circles",
  "Alfie Templeman",
  300,
  "Alfie T.jpg"
);

const cancion4 = new Cancion(4, "Elephant", "Tame Impala", 600, "TI.jpg");

const cancion5 = new Cancion(5, "Fire for you", "Cannons", 800, "cannons3.jpg");

const cancion6 = new Cancion(6, "00:00", "Siddhartha", 400, "SD.png");

//crear un array de objetos:
let bibliotecaDeCanciones = [];
//dos posibilidades que en storage exista algo o que no exista
//condicional que evalue si hay algo
if (localStorage.getItem("bibliotecaDeCanciones")) {
  //si existe algo en el storage entra al if
  bibliotecaDeCanciones = JSON.parse(
    localStorage.getItem("bibliotecaDeCanciones")
  );
} else {
  bibliotecaDeCanciones.push(
    cancion1,
    cancion2,
    cancion3,
    cancion4,
    cancion5,
    cancion6
  );
  localStorage.setItem(
    "bibliotecaDeCanciones",
    JSON.stringify(bibliotecaDeCanciones)
  );
}
