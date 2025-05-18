let colorSeleccionado = "blanco";
let talla = "blank";
let subtotal = 0;
let total = subtotal;
let envio = false;
let direccionEnvio = "";


function muestraImagen(event){
    const botonId = event.target.id;
    const img = document.getElementById("espacioImg");
    colorSeleccionado = botonId;
   
    if (botonId === 'blanco'){
    img.src="images/auto-blanco.png";
    }
    else if (botonId === 'negro'){
        img.src="images/auto-negro.png"
    }
    else if (botonId === 'rojo'){
        img.src="images/auto-rojo.png"
    }

    setTimeout(() =>{
        const tallaSeleccionada = document.getElementById("tallas").value;
        if (tallaSeleccionada) {
            calculaPrecioTallaColor();
        }
    } , 0);
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
function calculaPrecioTallaColor(){
    talla = document.getElementById("tallas").value;
    const textoSubtotal = document.getElementById("subtotal-text");

    if (talla === "blank") {
        subtotal = 0;
        textoSubtotal.value = "";
        return;}

    let precioBase = 20000;
    subtotal = precioBase;
    if (colorSeleccionado === 'blanco'){
        if(talla === "medium"){
            subtotal += 4000;
        } 
        else if (talla ==="large"){
            subtotal += 6000;
        } else {
            subtotal = precioBase;
        }
    }
    else if (colorSeleccionado === 'negro'){
        if(talla === "small"){
            subtotal += 9000;
        } 
        else if (talla ==="medium"){
            subtotal += 13000;
        } else {
            subtotal += 17000;
        }
    }
    else if (colorSeleccionado === 'rojo'){
       if(talla === "medium"){
            subtotal += 16000;
        } 
        else if (talla ==="large"){
            subtotal += 19000;
        } else {
            subtotal = precioBase;
        }
    }
    // parrafoSubtotal.innerHTML = `Subtotal: \$${subtotal}`;
    textoSubtotal.value = `Subtotal: \$${subtotal}`;
};

function calculaTotal(event){
    let envioId= event.target.id;
    let textoTotal = document.getElementById("total-text");
    
    if (envioId === "envio"){
        total = subtotal + 4000;
        envio = true;
    }
    else{
        total = subtotal;
        envio = false;
    }
    textoTotal.value = `Total: \$${total}`;
    return total;
};

function mostrarInputDireccion(event){
    let envioId= event.target.id;

    if (envioId==="envio") {
        document.getElementById("direccion").hidden = false;
        document.getElementById("direccion-label").hidden = false;
    } else {
        document.getElementById("direccion").hidden = true;
        document.getElementById("direccion-label").hidden = true;
    }
};

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