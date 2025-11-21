document.getElementById("registroForm").addEventListener("submit", validarFormulario);

function mostrarError(idCampo, mensaje) {
    const errorSpan = document.getElementById("error-" + idCampo);
    const input = document.getElementById(idCampo);

    errorSpan.textContent = mensaje;
    input.classList.add("invalid");
}

function limpiarError(idCampo) {
    const errorSpan = document.getElementById("error-" + idCampo);
    const input = document.getElementById(idCampo);

    errorSpan.textContent = "";
    input.classList.remove("invalid");
}

function validarFormulario(event) {
    event.preventDefault(); 

    let esValido = true;

    ["nombre", "email", "edad", "lenguaje"].forEach(campo => limpiarError(campo));

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const edad = parseInt(document.getElementById("edad").value);
    const lenguaje = document.getElementById("lenguaje").value;


    if (nombre === "" || email === "" || !edad || lenguaje === "") {
        alert("Por favor, llena todos los campos antes de continuar.");
        esValido = false;
    }

    if (nombre.length < 3) {
        mostrarError("nombre", "El nombre debe tener mínimo 3 caracteres.");
        esValido = false;
    }

    if (!email.includes("@")) {
        mostrarError("email", "El correo debe contener '@'.");
        esValido = false;
    } else {
        const partes = email.split("@");
        const dominio = partes[1];

        const dominiosPermitidos = [
            "gmail.com",
            "hotmail.com",
            "yahoo.com",
            "ist17dejulio.edu.ec"
        ];

        if (!dominiosPermitidos.includes(dominio)) {
            mostrarError("email", "Dominio no permitido. Usa: " + dominiosPermitidos.join(", "));
            esValido = false;
        }
    }

    if (isNaN(edad) || edad < 18) {
        mostrarError("edad", "Debes tener mínimo 18 años.");
        esValido = false;
    }

    if (lenguaje === "") {
        mostrarError("lenguaje", "Debes seleccionar un lenguaje.");
        esValido = false;
    }

    if (esValido) {
        alert("¡Registro exitoso!"); 
        
        const mensaje = document.getElementById("success-message");
        mensaje.style.display = "block";
        mensaje.textContent = "¡Registro exitoso!";

        document.getElementById("registroForm").reset();
        
        setTimeout(() => {
            mensaje.style.display = "none";
        }, 4000);
    }
}