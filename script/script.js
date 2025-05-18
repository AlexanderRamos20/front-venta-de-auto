let colorSeleccionado = "blanco";
let precioBase = 3500000;
let subtotalColor = 0;
let subtotalAccesorio = 0;


function muestraImagen(event){
    const botonId = event.target.id;
    const img = document.getElementById("espacioImg");
    colorSeleccionado = botonId;
   
    if (botonId === 'blanco'){
    img.src="images/auto-blanco.png";
    subtotalColor = precioBase
    calcularTotal();
    }
    else if (botonId === 'negro'){
        img.src="images/auto-negro.png";
        subtotalColor = precioBase + 800000;
        calcularTotal();
    }
    else if (botonId === 'rojo'){
        img.src="images/auto-rojo.png";
        subtotalColor = precioBase + 400000;
        calcularTotal();
    }

    // setTimeout(() =>{
    //     const tallaSeleccionada = document.getElementById("tallas").value;
    //     if (tallaSeleccionada) {
    //         calculaPrecioTallaColor();
    //     }
    // } , 0);
}
// function reiniciarSubtotal(){
//     document.getElementById("subtotal-text").value="";
// }
// function reiniciarTalla(){
//     document.getElementById("tallas").value="blank";
// }

// function reiniciarEnvio(){
//     document.getElementById("retiro").checked = false;
//     document.getElementById("envio").checked = false;
//     document.getElementById("total-text").value = "";
// }

// function reiniciarElementos(){
//     reiniciarSubtotal(); reiniciarTalla(); reiniciarEnvio()
// }


function calcularTotal(){
    total = document.getElementById("subtotal-text");
    total.value = (`$${subtotalColor + subtotalAccesorio} clp`);
}

function confirmarPedido (event){
    direccionEnvio = document.getElementById("direccion").value.trim();
    const resumenCompra = {
        color: colorSeleccionado,
        talla: talla,
        envio: envio,
        direccionEnvio: direccionEnvio,
        subtotal: subtotal,
        total: total
    }

    const coloresValidos = ["blanco", "negro", "rojo"];
    const tallasValidas = ["small", "medium", "large"];

    if (
        coloresValidos.includes(resumenCompra.color) &&
        tallasValidas.includes(resumenCompra.talla) &&
        typeof resumenCompra.envio === "boolean" &&
        Number.isInteger(resumenCompra.subtotal) && resumenCompra.subtotal> 0 &&
        Number.isInteger(resumenCompra.total) && resumenCompra.total > 0
    ){
        if (resumenCompra.envio === true)
            {
            if (resumenCompra.direccionEnvio.trim() === "")
                {
                    alert ("Dirección de envío no válida, vuelva a ingresarla");
                    return;
                }
            }

    const mensaje = `Pedido confirmado:
    -Color: ${resumenCompra.color}
    -Talla: ${resumenCompra.talla}
    -Envío: ${resumenCompra.envio ? "Sí" : "No"}
    -direccion: ${resumenCompra.direccionEnvio ? resumenCompra.direccionEnvio: "No aplica"}
    -Subtotal: ${resumenCompra.subtotal}
    -Total: ${resumenCompra.total}`
    
    const mensajeCodificado = encodeURIComponent(mensaje);
    const numeroWhatsapp = "56975848210";

        window.open(`https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`, "_blank")
    } else {
                alert("Hay uno o más campos inválidos en su pedido. Favor vuela a intentarlo.")
            }
};