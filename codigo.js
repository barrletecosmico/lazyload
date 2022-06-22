"use strict";

const publicaciones = document.querySelector(".publicaciones");
let contador = 0;
const createPublicationCode = (name,content) =>{

    const container = document.createElement("DIV");
    const autor = document.createElement("DIV");
    const h3 = document.createElement("h3");
    const contenido = document.createElement("DIV");
    const comentarios_c = document.createElement("DIV");
    const comentario = document.createElement("input");
    const btnenviar = document.createElement("button");

    container.classList.add("publicacion");
    autor.classList.add("autor");
    contenido.classList.add("contenido");
    comentarios_c.classList.add("comentarios");
    comentario.classList.add("comentario");
    btnenviar.classList.add("btnenviar");

    comentario.setAttribute("placeholder","Ingresa un comentario");
    btnenviar.textContent = "Comentar";

    h3.textContent = name;
    contenido.textContent = content;
    
    autor.appendChild(h3);
    comentarios_c.appendChild(comentario);
    comentarios_c.appendChild(btnenviar);
    container.appendChild(autor);
    container.appendChild(contenido);
    container.appendChild(comentarios_c);

    return container;    
}

const cargarMas = entry =>{
    if(entry[0].isIntersecting) cargarPublicaciones(3);
}

const observer = new IntersectionObserver(cargarMas);

const cargarPublicaciones = async num => {
    const request = await fetch("info.txt");
    const content = await request.json();
    const arr = content.content;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) { 
        if(arr[contador] != undefined){        
            const newPublicacion = createPublicationCode(arr[contador].nombre,arr[contador].contenido);
            fragment.appendChild(newPublicacion);
            contador++;
        if(i == num-1) observer.observe(newPublicacion);
        }else{
            let noMore = document.createElement("h3");
            noMore.textContent = "No hay más publicaciones";
            fragment.appendChild(noMore);
            publicaciones.appendChild(fragment);
            break;
        }
    }
    publicaciones.appendChild(fragment);
}

cargarPublicaciones(4);