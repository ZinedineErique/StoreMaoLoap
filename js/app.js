// const btnMenu = document.getElementById('btnMenu');
// const menu = document.getElementById('menu');

// btnMenu.addEventListener('click', ()=>{
//     menu.classList.toggle('mostrar');
// })
// /* Hata la linea 7 de codigo es el menu desplegable */

// const subMenuBtn = document.querySelectorAll(".submenu-btn");

// for(let i =0;i<subMenuBtn.length;i++){
//     subMenuBtn[i].addEventListener('click',()=>{
//         if(window.innerWidth <1024){ // puedo ver el ancho de la ventana
//             // const subMenu = document.querySelector('.submenu');
//             const subMenu = subMenuBtn[i].nextElementSibling;
//             const height = subMenu.scrollHeight;
//             if (subMenu.classList.contains("desplegar")) {
//                 subMenu.classList.remove("desplegar");
//                 subMenu.removeAttribute("style");
//             }else{
//                 subMenu.classList.add("desplegar");
//                 subMenu.style.height = height +"px";
//             }
//         }
//     })
// }