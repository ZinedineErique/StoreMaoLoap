const grid = document.querySelector(".grid")
const contador_elementos = document.querySelector(".short div span")
const content_carrito = document.getElementById("content_carrito");
const cant = document.getElementById("cant")
const comprar =document.querySelector(".aling-button button");
let json_elementos ={}


// var CarritoArr =[];

window.addEventListener("load",()=>{
    console.log("hola papi")
    json_elementos =obtenerJugosLocalStorage();
    actualizar_contador(json_elementos);
})


content_carrito.addEventListener("click",(e)=>{ 

    aumentar_producto(e)

    eliminar_producto(e)
})

grid.addEventListener("click",(e)=>{
    console.log(e.target.classList.contains("cent"));
    if(e.target.classList.contains("cent")){
        puntero = e.target
        console.log(puntero.parentNode.parentNode.parentNode.children[0].children[0].src)
        let elemento = {
            id: puntero.dataset.id,
            Cantidad: 1,
            src: puntero.parentNode.parentNode.parentNode.children[0].children[0].src,
            Precio: parseFloat(puntero.parentNode.children[0].textContent.replace("$","").replace(" us","")),
            Jugo: puntero.parentNode.parentNode.children[0].textContent,
            Description: puntero.parentNode.parentNode.children[1].textContent
        }

        if(json_elementos.hasOwnProperty(elemento.id)){
            elemento.Cantidad =  json_elementos[elemento.id].Cantidad +  1;
        }

        json_elementos[elemento.id] = {...elemento};
        console.log(json_elementos);
    }
    actualizar_contador(json_elementos);
})


const actualizar_contador = (objeto)=>{
    contador_elementos.textContent = Object.values(objeto).length
    CarritoArr = Object.values(objeto)
    template_carrito(CarritoArr)
    guardarCursoLocalStorage(objeto)
    pintarCantidad(objeto)
}


const template_carrito = (arreglo)=>{
    console.log(arreglo)
    let newArr = arreglo
    let elemtCarrito = '';
    content_carrito.innerHTML ="";
    (newArr).forEach((producto)=>{
        elemtCarrito +=`
        <div class="shor-list">
            <figure class="shor-list_figure">
                <img src="${producto.src}" alt="">
            </figure>
            <div class="shor-list_text">
                <div class="content_Text">
                    <h2>${producto.Jugo}</h2>
                    <p class="precio">$${producto.Precio} us</p>
                    <div class="shor-action">
                        <div class="reducer action" data-id="${producto.id}">-</div>
                        <p>${producto.Cantidad}</p>
                        <div class="plus action" data-id="${producto.id}">+</div>
                    </div>
                </div>
                <figure  data-id="${producto.id}" class="content_Delete">
                    <img data-id="${producto.id}" class="delete_element" src="/icons/Grupo3.svg" alt="delete">
                </figure>
            </div>
        </div>
        `;
     })
    //  content_carrito.innerHTML ="";
     content_carrito.innerHTML=elemtCarrito;
    //  guardarCursoLocalStorage(Object.values(carritoTotal));
    //  pintarCantidad(carritoTotal);
}


const aumentar_producto = (e)=>{
    puntero = e.target
    let cantidad =0
    if(puntero.classList.contains("action")){
        if(puntero.classList.contains("plus")){
            console.log("sumar")
            cantidad = parseFloat(puntero.parentNode.children[1].textContent)
            cantidad +=1;
            json_elementos[puntero.dataset.id].Cantidad = cantidad;
            puntero.parentNode.children[1].textContent = cantidad;
        }else{
            console.log("Restar");
            cantidad = parseFloat(puntero.parentNode.children[1].textContent)
            cantidad === 1? cantidad =1 : cantidad -=1;
            puntero.parentNode.children[1].textContent = cantidad;
            json_elementos[puntero.dataset.id].Cantidad = cantidad;
        }
        actualizar_contador(json_elementos);
    }
}

const eliminar_producto =(e)=>{
    puntero = e.target
    if(puntero.classList.contains("delete_element")){
        delete json_elementos[puntero.dataset.id];
        actualizar_contador(json_elementos);
    }
}


const guardarCursoLocalStorage =(lista_jugos)=>{

    localStorage.setItem('jugos', JSON.stringify(lista_jugos) );

}

function obtenerJugosLocalStorage() {
    let JugosLocalStorage;
    // comprobamos si hay algo en localStorage
    if(localStorage.getItem('jugos') === null) {
        JugosLocalStorage = {};
    } else {
        JugosLocalStorage = JSON.parse( localStorage.getItem('jugos') );
    }
    return JugosLocalStorage;
}

function pintarCantidad(lista){
    let acum =0;
    let nuevaLista = Object.values(lista)
    nuevaLista.forEach(element =>{
         acum +=element.Cantidad * element.Precio;
    })
    cant.textContent = `S/.${acum}.00`;
}

const compra_mensaje = (objeto)=>{
    let mensaje= '';
    let mensaje_producto ='';
    let precio_total = 0;
    Object.values(objeto).forEach(element => {
        mensaje = `
        *Mao Store* %0A
        ESTOS SON LOS PRODUCTOS SOLICITADOS %0A
        `
        mensaje_producto+=`%0A
        **Nombre* = ${element.Jugo}%0A
        **Precio* = ${element.Precio}%0A
        **Cantidad* = ${element.Cantidad}%0A
        **subTotal* = ${element.Cantidad * element.Precio}%0A
        ---------------------------- %0A`

        precio_total +=element.Cantidad * element.Precio;
    });

    return total = `
    ${mensaje}
    ${mensaje_producto}
    **Precio Total*: S/${precio_total +''}`
}


comprar.addEventListener('click',()=>{
    window.open(`https://wa.me/+51972080020?text= ${compra_mensaje(json_elementos)} %0A %0A *TE GUSTO EL DEMO,QUE ESPERAS CONTACTAME!!*`);
})