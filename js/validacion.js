//Haz tú validación en javascript acá
import { mensajes, tiposErrores } from "./customErrores.js"

const formularioContacto = document.querySelector("[data-formulario-contacto]");


formularioContacto.addEventListener("submit", evento => {
    evento.preventDefault();
    const listaContacto = {
        nombre: evento.target.elements["nombre"].value,
        email: evento.target.elements["email"].value,
        asunto: evento.target.elements["asunto"].value,
        mensaje: evento.target.elements["mensaje"].value,
    };
    const contacto = JSON.parse(localStorage.getItem("contacto")) || [];
    contacto.push(listaContacto);
    localStorage.setItem("contacto", JSON.stringify(contacto));

    evento.target.elements["nombre"].value = "";
    evento.target.elements["email"].value = "";
    evento.target.elements["asunto"].value = "";
    evento.target.elements["mensaje"].value = "";
});

formularioContacto.querySelectorAll('input[required],textarea[required]').forEach(campo => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

function verificarCampo(campo) {
    const mensajeError = document.querySelector(`span.mensaje-error[name="${campo.name}"]`);
    campo.setCustomValidity("");
    mensajeError.textContent = "";

    if (!campo.validity.valid) {
        const errores = tiposErrores.map(error => {
            if (campo.validity[error]) {
                return mensajes[campo.name][error];
            }
        }).filter(error => error);
        mensajeError.textContent = errores.join(", ");
    }
}