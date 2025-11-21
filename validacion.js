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
    event.preventDefault(); // Evita que el formulario se envíe sin validar

    let esValido = true;

    // Limpiar errores anteriores
    ["nombre", "email", "edad", "lenguaje"].forEach(campo => limpiarError(campo));

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const edad = parseInt(document.getElementById("edad").value);
    const lenguaje = document.getElementById("lenguaje").value;

    // ---------------------------
    // ❗ VALIDACIÓN: Campos vacíos
    // ---------------------------
    if (nombre === "" || email === "" || !edad || lenguaje === "") {
        alert("Por favor, llena todos los campos antes de continuar.");
        esValido = false;
    }

    // ---------------------------
    // ❗ Validación del Nombre
    // ---------------------------
    if (nombre.length < 3) {
        mostrarError("nombre", "El nombre debe tener mínimo 3 caracteres.");
        esValido = false;
    }

    // ---------------------------
    // ❗ Validación del Correo
    // ---------------------------
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

    // ---------------------------
    // ❗ Validación de Edad
    // ---------------------------
    if (isNaN(edad) || edad < 18) {
        mostrarError("edad", "Debes tener mínimo 18 años.");
        esValido = false;
    }

    // ---------------------------
    // ❗ Validación del Lenguaje
    // ---------------------------
    if (lenguaje === "") {
        mostrarError("lenguaje", "Debes seleccionar un lenguaje.");
        esValido = false;
    }

    // ---------------------------
    // ✔ Si todo es válido
    // ---------------------------
    if (esValido) {
        // 👇 AÑADIDO: Muestra el mensaje en un alert
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