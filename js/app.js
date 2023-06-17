// ==============================================================
// ========================VARIABLES=============================

// Selectores
const marca = document.querySelector("#marca");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const yearSelect = document.querySelector("#year");
const maxYear = new Date().getFullYear();
const minYear = maxYear - 13;

// Contenedor/Listado de los resultados
const resultado = document.querySelector("#resultado");

// Objeto general con los datos de la busqueda del usuario
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// ==============================================================
// ========================EVENTOS===============================
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar todo el listado de coches disponibles al cargar
  mostrarAutos(autos);

  // Llenar el select de años
  llenarSelect();
});

// Event listeners para cada opcion
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value);

  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;

  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;

  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);

  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;

  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;

  filtrarAuto();
});

// ==============================================================
// ========================FUNCIONES=============================

function mostrarAutos(autos) {
  // Limpiamos el HTML previo
  limpiarHTML();

  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, transmision, color } = auto;

    const autoHTML = document.createElement("P");

    autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - ${transmision} - Color: ${color} - Precio: ${precio} 
        `;

    // Insertar en el listado de resultado
    resultado.appendChild(autoHTML);
  });
}

// Limpiar el HTML previo

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect() {
  // Generar los años
  for (let i = maxYear; i >= minYear; i--) {
    const opcion = document.createElement("option"); // Creamos cada opcion del select
    opcion.value = i; // Añádimos su valor
    opcion.textContent = i; // Añadimos su nombre

    yearSelect.appendChild(opcion); // Insertar cada opcion en el select
  }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {

    mostrarAutos(resultado);

  } else {
    noResultado()
  }
}

// Filtrado por marca
function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  } else {
    return auto;
  }
}

// Filtrado por año
function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  } else {
    return auto;
  }
}

// Filtrado por precio minimo
function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  } else {
    return auto;
  }
}

// Filtrado por precio maximo
function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  } else {
    return auto;
  }
}

// Filtrado por puertas
function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  } else {
    return auto;
  }
}

// Filtrado por transmision
function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  } else {
    return auto;
  }
}

// Filtrado por color
function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  } else {
    return auto;
  }
}

// Mostrar mensaje "Sin Resultados"
function noResultado() {

  limpiarHTML()

  const noResultado = document.createElement('DIV')
  noResultado.classList.add('alerta', 'error')
  noResultado.textContent = 'No hay resultados para la búsqueda solicitada'

  resultado.appendChild(noResultado)
}