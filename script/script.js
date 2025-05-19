let colorSeleccionado = "blanco";
let precioBase = 3500000;
let subtotalColor = 0;
let subtotalAccesorio = 0;
let total = 0;
let listadoAccesorio = [];


function muestraImagen(event){
    const botonId = event.target.id;
    const img = document.getElementById("espacioImg");
    colorSeleccionado = botonId;
    
    if (botonId === 'blanco'){
        img.src="images/auto-blanco.png";
        subtotalColor = precioBase;
        colorSeleccionado = "blanco";
    }
    else if (botonId === 'negro'){
        img.src="images/auto-negro.png";
        subtotalColor = precioBase + 800000;
        colorSeleccionado = "negro";

    }
    else if (botonId === 'rojo'){
        img.src="images/auto-rojo.png";
        subtotalColor = precioBase + 400000;
        colorSeleccionado = "rojo";
    }
}

document.addEventListener('DOMContentLoaded', () => {
  subtotalColor = precioBase;
  calcularTotal();
});

function calcularSubtotalAccesorios(){
    subtotalAccesorio = 0;
    listadoAccesorio = [];
    const arregloAccesorios = document.querySelectorAll('input[name="accesorios"]');
    arregloAccesorios.forEach(accesorio => {
        if (accesorio.checked) {subtotalAccesorio += parseInt(accesorio.value)};
        accesorio.checked ? listadoAccesorio.push(true):listadoAccesorio.push(false); 
    });
}
function listenerSubtotalAccesorios(){
    const arregloAccesorios = document.querySelectorAll('input[name="accesorios"]');
    arregloAccesorios.forEach(accesorio => {
        accesorio.addEventListener('change', calcularSubtotalAccesorios)
    });
}
listenerSubtotalAccesorios();

function reiniciarAccesorios(){
    const arregloAccesorios = document.querySelectorAll('input[name="accesorios"]');
    arregloAccesorios.forEach(accesorio => {
        accesorio.checked = false;
    });
    calcularSubtotalAccesorios();
    calcularTotal();
};

function calcularTotal(){
    totalInput = document.getElementById("total-text");
    total = subtotalAccesorio + subtotalColor;
    totalInput.value = (`$${total} clp`);
}

function recalcularTotal(){
    const arregloColorAuto = document.querySelectorAll('input[name="color-auto"]');
    const arregloAccesorios = document.querySelectorAll('input[name="accesorios"]');
    const arregloColorAccesorios = [...arregloColorAuto, ...arregloAccesorios]
    arregloColorAccesorios.forEach(elemento => {
        elemento.addEventListener('change', calcularTotal);
        console.log("paso 1")
    });
}

recalcularTotal();

function mostrarDatos(){
    const infoPedido = document.getElementById("datos-pedido");
    const mensajeAccesorios = ;
    const mensajePedido = `
    <strong>Color:</strong> ${colorSeleccionado}<br>
    <strong>Accesorios:</strong> ${mensajeAccesorios}<br>
    <strong>Precio Vehículo:</strong> $${subtotalColor}<br>
    <strong>Precio accesorios:</strong> $${subtotalAccesorio}<br>
    <strong>Precio final:</strong> $${total}`;    
    infoPedido.innerHTML = mensajePedido;
};