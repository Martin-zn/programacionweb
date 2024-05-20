// Función para validar el formulario
function validarFormulario() {
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var correo = document.getElementById("correo").value;
    var nombreUsuario = document.getElementById("nombreUsuario").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm_password").value;
  
    // Expresiones regulares para validar el correo electrónico y el nombre de usuario
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var regexNombreUsuario = /^[a-zA-Z0-9_]+$/;
  
    // Validar nombre
    if (nombre.trim() === "") {
      alert("Por favor, ingrese su nombre.");
      return false;
    }
  
    // Validar apellido
    if (apellido.trim() === "") {
      alert("Por favor, ingrese sus apellidos.");
      return false;
    }
  
    // Validar correo electrónico
    if (!regexCorreo.test(correo)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return false;
    }
  
    // Validar nombre de usuario
    if (nombreUsuario.trim() === "") {
      alert("Por favor, ingrese un nombre de usuario.");
      return false;
    }
  
    if (!regexNombreUsuario.test(nombreUsuario)) {
      alert("El nombre de usuario solo puede contener letras, números y guiones bajos.");
      return false;
    }
  
    // Validar contraseña
    if (password.trim() === "") {
      alert("Por favor, ingrese una contraseña.");
      return false;
    }
  
    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return false;
    }
  
    // Si todas las validaciones pasan, registrar el usuario
    registrarUsuario(nombre, apellido, correo, nombreUsuario, password);
    return true;
  }
  
  // Función para registrar un nuevo usuario
  function registrarUsuario(nombre, apellido, correo, nombreUsuario, password) {
    // Crear un objeto con los datos del usuario
    var userData = {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      nombreUsuario: nombreUsuario,
      password: password
    };
  
    // Almacenar los datos del usuario en localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  
    alert("Usuario registrado exitosamente.");
  }