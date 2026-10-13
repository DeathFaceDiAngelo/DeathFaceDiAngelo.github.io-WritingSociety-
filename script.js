// más vendidos
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination : {
        el:".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
    },
    
});

// Carrito de compras
const carrito = document.getElementById('carrito');
const listaLibros = document.querySelector('#lista');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {

    if (listaLibros) {
        listaLibros.addEventListener('click', comprarLibro);
    }
    
    if (carrito) {
        carrito.addEventListener('click', eliminarLibro);
    }

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarLibro(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const libro = e.target.parentElement;
        leerDatosLibro(libro);
    }
}

function leerDatosLibro(libro) {
    const infoLibro = {
        imagen: libro.querySelector('img').src,
        titulo: libro.querySelector('h3').textContent,
        precio: libro.querySelector('.precio').textContent,
        id: libro.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoLibro);
}

function insertarCarrito(libro) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${libro.imagen}" width="80">
        </td>
        <td>${libro.titulo}</td>
        <td>${libro.precio}</td>
        <td>
            <a href="#" class="borrar" data-id="${libro.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
    guardarLibroLocalStorage(libro);
}

function eliminarLibro(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const libroId = e.target.getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
        eliminarLibroLocalStorage(libroId);
    }
}

function vaciarCarrito(e) {
    e.preventDefault();
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    vaciarLocalStorage();
}

function guardarLibroLocalStorage(libro) {
    const libros = obtenerLibrosLocalStorage();
    libros.push(libro);
    localStorage.setItem('libros', JSON.stringify(libros));
}

function obtenerLibrosLocalStorage() {
    let librosLS;
    if (localStorage.getItem('libros') === null) {
        librosLS = [];
    } else {
        librosLS = JSON.parse(localStorage.getItem('libros'));
    }
    return librosLS;
}

function leerLocalStorage() {
    const librosLS = obtenerLibrosLocalStorage();
    librosLS.forEach(function(libro) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${libro.imagen}" width="80">
            </td>
            <td>${libro.titulo}</td>
            <td>${libro.precio}</td>
            <td>
                <a href="#" class="borrar" data-id="${libro.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
    });
}

function eliminarLibroLocalStorage(libroId) {
    let librosLS = obtenerLibrosLocalStorage();
    librosLS = librosLS.filter(libro => libro.id !== libroId);
    localStorage.setItem('libros', JSON.stringify(librosLS));
}

function vaciarLocalStorage() {
    localStorage.removeItem('libros');
}




// Inicialización de Swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

cargarEventListeners();

function cargarEventListeners() {
    // Delegación de evento global para los botones 'agregar-carrito'
    document.addEventListener('click', comprarLibro);

    if (carrito) {
        carrito.addEventListener('click', eliminarLibro);
    }

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarLibro(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        // Obtiene la tarjeta contenedora (sirve tanto para .deceados del Swiper como para .tarjeta-producto del Catálogo)
        const libro = e.target.parentElement;
        leerDatosLibro(libro);
    }
}

function leerDatosLibro(libro) {
    // Extrae título detectando <h3> o <h4>
    const tituloElem = libro.querySelector('h3') || libro.querySelector('h4');
    
    const infoLibro = {
        imagen: libro.querySelector('img').src,
        titulo: tituloElem ? tituloElem.textContent : 'Libro sin título',
        precio: libro.querySelector('.precio').textContent,
        id: libro.querySelector('.agregar-carrito').getAttribute('data-id')
    };
    
    insertarCarrito(infoLibro);
}

function insertarCarrito(libro) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${libro.imagen}" width="60" style="border-radius:4px;">
        </td>
        <td style="padding: 0 8px;">${libro.titulo}</td>
        <td>${libro.precio}</td>
        <td>
            <a href="#" class="borrar" data-id="${libro.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
    guardarLibroLocalStorage(libro);
}

function eliminarLibro(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const libroId = e.target.getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
        eliminarLibroLocalStorage(libroId);
    }
}

function vaciarCarrito(e) {
    e.preventDefault();
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    vaciarLocalStorage();
}

// Persistencia en LocalStorage
function guardarLibroLocalStorage(libro) {
    const libros = obtenerLibrosLocalStorage();
    libros.push(libro);
    localStorage.setItem('libros', JSON.stringify(libros));
}

function obtenerLibrosLocalStorage() {
    let librosLS;
    if (localStorage.getItem('libros') === null) {
        librosLS = [];
    } else {
        librosLS = JSON.parse(localStorage.getItem('libros'));
    }
    return librosLS;
}

function leerLocalStorage() {
    const librosLS = obtenerLibrosLocalStorage();
    librosLS.forEach(function(libro) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${libro.imagen}" width="60" style="border-radius:4px;">
            </td>
            <td style="padding: 0 8px;">${libro.titulo}</td>
            <td>${libro.precio}</td>
            <td>
                <a href="#" class="borrar" data-id="${libro.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
    });
}

function eliminarLibroLocalStorage(libroId) {
    let librosLS = obtenerLibrosLocalStorage();
    librosLS = librosLS.filter(libro => libro.id !== libroId);
    localStorage.setItem('libros', JSON.stringify(librosLS));
}

function vaciarLocalStorage() {
    localStorage.removeItem('libros');
}

// Función para filtrar por categorías
function filtrarCatalogo(categoria, e) {
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => btn.classList.remove('active'));
    if (e) e.target.classList.add('active');

    const tarjetas = document.querySelectorAll('.tarjeta-producto');
    tarjetas.forEach(tarjeta => {
        const cat = tarjeta.getAttribute('data-categoria');
        
        if (categoria === 'todos' || cat === categoria) {
            tarjeta.classList.remove('oculto');
        } else {
            tarjeta.classList.add('oculto');
        }
    });
}