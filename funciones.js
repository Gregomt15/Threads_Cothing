const productos = [
    { nombre: "Buzo negro", categoria: "Buzo", precio: "50.000", imagen: "bn.png" },
    { nombre: "Pantalón Azul Feo", categoria: "Pantalón", precio: "70.000", imagen: "PantalonAzulHorrible.png" },
    { nombre: "Pantalón Azul", categoria: "Pantalón", precio: "80.000", imagen: "pa.jpg" },
    { nombre: "Buzo verde", categoria: "Buzo", precio: "70.000", imagen: "BuzoVerde.png" },
    { nombre: "Buzo Rojo", categoria: "Buzo", precio: "50.000", imagen: "Buzorojo.png" },
    { nombre: "Pantalón Gris", categoria: "Pantalón", precio: "70.000", imagen: "pg.png" }
];

function mostrarProductos(filtroCategoria = "", ordenPrecio = "", filtroColor = "") {
    let lista = [...productos];

    if (filtroCategoria) {
        lista = lista.filter(p => p.categoria.toLowerCase().includes(filtroCategoria.toLowerCase()));
    }

    if (filtroColor) {
        lista = lista.filter(p => p.nombre.toLowerCase().includes(filtroColor.toLowerCase()));
    }

    if (ordenPrecio === "asc") {
        lista.sort((a, b) => parseFloat(a.precio.replace('.', '')) - parseFloat(b.precio.replace('.', '')));
    } else if (ordenPrecio === "desc") {
        lista.sort((a, b) => parseFloat(b.precio.replace('.', '')) - parseFloat(a.precio.replace('.', '')));
    }

    let contenido = "";
    lista.forEach((producto, id) => {
        contenido += `
            <div class="producto">
                <img src="img/${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
                <p>${producto.precio} $</p>
                <button type="button" onclick="redireccion(${id})">Ver Detalle producto</button>
                <button type="button" onclick="agregarProd(${id})">
                    <img src="img/cart.svg" alt="Carrito" class="carrito">
                </button>
            </div>
        `;
    });
    document.getElementById("listado-productos").innerHTML = contenido;
}

function aplicarFiltros() {
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;
    const color = document.getElementById("color").value;
    mostrarProductos(categoria, precio, color);
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("categoria")) {
        document.getElementById("categoria").addEventListener("change", aplicarFiltros);
        document.getElementById("precio").addEventListener("change", aplicarFiltros);
        document.getElementById("color").addEventListener("change", aplicarFiltros);
        mostrarProductos();
    }
});

let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];

function agregarProd(idProd) {
    carrito.push(productos[idProd]);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    const car = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenido = "";
    let total = 0;

    car.forEach((elemento) => {
        const precioNum = parseFloat(elemento.precio.replace('.', ''));
        total += precioNum;

        contenido += `
            <div class="producto">
                <img src="img/${elemento.imagen}" alt="${elemento.nombre}">
                <p>${elemento.nombre}</p>
                <p>${elemento.precio} $</p>
            </div>
        `;
    });

    document.getElementById("Listado-carrito").innerHTML = contenido;

    if (document.getElementById("precio-total")) {
        document.getElementById("precio-total").textContent = `Total: $${total.toLocaleString()}`;
    }
}

function buscar(palabra){
    let lista = [...productos];

        lista = lista.filter(p => p.nombre.toLowerCase().includes(palabra.toLowerCase()));

    let contenido = "";
    lista.forEach((producto, id) => {
        contenido += `
            <div class="producto">
                <img src="img/${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
                <p>${producto.precio} $</p>
                <button type="button" onclick="">Ver Detalle producto</button>
                <button type="button" onclick="agregarProd(${id})">
                    <img src="img/cart.svg" alt="Carrito" class="carrito">
                </button>
            </div>
        `;
    });
    document.getElementById("listado-productos").innerHTML = contenido;
}
    function redireccion(id) {
        localStorage.setItem("idProd", id);
        console.log(id)
        location.href = "prod.html";
    }

        function cargarDetalleProducto() {
        const id = localStorage.getItem("idProd");
        console.log(id)
        if (id !== null && productos[id]) {
            const p = productos[id];
            document.getElementById("detalle-producto").innerHTML = `
                <img src="img/${p.imagen}" alt="${p.nombre}">
                <div class="detalle-info">
                    <h2>${p.nombre}</h2>
                    <p class="detalle-precio">${p.precio} $</p>
                    <p>Este es un excelente ${p.categoria.toLowerCase()}, hecho a partir de materiales de alta calidad.</p>
                    <button class="btn-agregar" onclick="agregarProd(${id})">Agregar al carrito</button>
                </div>
            `;
        } else {
            document.getElementById("detalle-producto").innerHTML = "<p>Producto no encontrado</p>";
        }
    }
    function limpiarCarrito(){
        localStorage.setItem("carrito", []);
        carrito=[];
        location.href="carrito.html"
    }