const cerrar = document.querySelector('.shopping-close');
const short= document.querySelector('.short')
const shopping = document.querySelector('.shor-desplegar');

cerrar.addEventListener('click',()=>{
    shopping.classList.toggle('D_shopping');
})

short.addEventListener('click',()=>{
    shopping.classList.toggle('D_shopping');
})