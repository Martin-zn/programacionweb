//Funcion para creacion de tarjetas...
//En la pagina principal 
$(document).ready(function() {
    function crearTarjetasAutores(autores) {
      const cardContainer = $('#cardContainer');
      cardContainer.empty();

      const autoresLimitados = autores.slice(0, 3);
  
      autoresLimitados.forEach(function(autor) {
        const tarjeta = $('<div>').addClass('col');
        const tarjetaBody = $('<div>').addClass('card text-center h-100');
        const enlaceImagen = $('<a>').attr('href', autor.link).attr('target', '_blank');
        const imagen = $('<img>').addClass('card-img-top img-thumbnail').attr('src', autor.imagen).attr('alt', autor.nombre);
        enlaceImagen.append(imagen);
        const tarjetaContenido = $('<div>').addClass('card-body');
        const titulo = $('<h5>').addClass('card-title').text(autor.name);
        const descripcion = $('<p>').addClass('card-text').text(autor.descripcion);
        const estilo = $('<p>').addClass('card-text').text("Estilo: "+ autor.estilo);
  
        tarjetaContenido.append(titulo, descripcion,estilo);
        tarjetaBody.append(enlaceImagen, tarjetaContenido);
        tarjeta.append(tarjetaBody);
        cardContainer.append(tarjeta);
      });
    }

//Obtengo los datos del local Storage

$(document).ready(function(){
  const autoresJson = localStorage.getItem('users');
      if(autoresJson){
        const autores = JSON.parse(autoresJson);
        crearTarjetasAutores(autores);
      }
    })
  });

  //Funcion para creacion de carousel...
  function renderizarCarousel(obras) {
    const carouselItems = $('#carouselItems');
    const carouselIndicators = $('#carouselIndicators');
    carouselItems.empty();
    carouselIndicators.empty();
  
    const ultimasObras = obras.slice(-3);
  
    ultimasObras.forEach((obra, index) => {
      const carouselItem = $('<div>').addClass('carousel-item');
      if (index === 0) {
        carouselItem.addClass('active');
      }
      const enlace = $('<a>').attr('href', obra.link).attr('target', '_blank');
      const imagen = $('<img>').addClass('d-block w-100 carousel-img').attr('src', obra.imagen).attr('alt', obra.titulo);
      enlace.append(imagen)
      carouselItem.append(enlace);
      carouselItems.append(carouselItem);
  
      const carouselIndicator = $('<button>').attr('type', 'button').attr('data-bs-target', '#carouselExampleIndicators').attr('data-bs-slide-to', index);
      if (index === 0) {
        carouselIndicator.addClass('active').attr('aria-current', 'true');
      }
      carouselIndicator.attr('aria-label', `Slide ${index + 1}`);
      carouselIndicators.append(carouselIndicator);
    });
  }
  $(document).ready(function(){
    const obrasJson = localStorage.getItem('obras');
    if(obrasJson){
      const obras = JSON.parse(obrasJson);
      renderizarCarousel(obras);
    }
  });

  // $.getJSON('obras.json', function(datos) {
  //   renderizarCarousel(datos);
  // });

  $(document).ready(function() {
    function todosLosAutores(autores, obras) {
      const cardContainer = $('#allCardsContainer');
      cardContainer.empty();
  
      const filas = [];
      let fila = [];
  
      autores.forEach(function(autor, index) {
        const tarjeta = $('<div>').addClass('col');
        const tarjetaBody = $('<div>').addClass('card text-center h-100');
        const enlaceImagen = $('<a>').attr('href', autor.link).attr('target', '_blank');
        const imagen = $('<img>').addClass('card-img-top img-thumbnail').attr('src', autor.imagen).attr('alt', autor.nombre);
        enlaceImagen.append(imagen);
        const tarjetaContenido = $('<div>').addClass('card-body');
        const titulo = $('<h5>').addClass('card-title').text(autor.name);
        const descripcion = $('<p>').addClass('card-text').text(autor.descripcion);
        const obrasAutor = obras.filter(obra => obra.autor_id === autor.id);
        const cantidadObras = $('<p>').addClass('card-text').text(`Cantidad de obras: ${obrasAutor.length}`);
        const estilo = $('<p>').addClass('card-text').text("Estilo: "+ autor.estilo);
        tarjetaContenido.append(titulo, descripcion,estilo, cantidadObras);
        tarjetaBody.append(enlaceImagen, tarjetaContenido);
        tarjeta.append(tarjetaBody);
  
        fila.push(tarjeta);
  
        if ((index + 1) % 3 === 0 || index === autores.length - 1) {
          while (fila.length < 3) {
            fila.push($('<div>').addClass('col'));
          }
          filas.push($('<div>').addClass('row').append(fila));
          fila = [];
        }
      });
  
      filas.forEach(function(fila) {
        cardContainer.append(fila);
      });
    }

    function filtrarAutores(autores, searchTerm){
      const autoresFiltrados = autores.filter(autor => autor.name.toLowerCase().includes(searchTerm.toLowerCase()) || autor.estilo.toLowerCase().includes(searchTerm.toLowerCase()));
      return autoresFiltrados;
    }
  
    // Obtengo los datos del local Storage
    $(document).ready(function() {
      const autoresJson = localStorage.getItem('users');
      const obrasJson = localStorage.getItem('obras');
      if (autoresJson && obrasJson) {
        const autores = JSON.parse(autoresJson);
        const obras = JSON.parse(obrasJson);
        todosLosAutores(autores, obras);

        $("#searchInput").on("input", function() {
          const searchTerm = $(this).val();
          const autoresFiltrados = filtrarAutores(autores, searchTerm);
          todosLosAutores(autoresFiltrados, obras);
        });
      }
    });
  });




  //=========================================LOGIN=========================================//
$(document).ready(function(){
  function getUsers(){
    const userData = localStorage.getItem('users');
    return userData ? JSON.parse(userData) : [];
  }

  function validateLogin(username, password){
    const users = getUsers();
    const user = users.find(u => u.username === username);

    if (user && user.password === password){
      localStorage.setItem('currentUser', JSON.stringify({id: user.id, name: user.name, img: user.imagen}));
      return true;
    } else{
      return false;
    }
  }

  $('#loginForm').submit(function(event){
    event.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();

    if(validateLogin(username, password)){
      window.location.href = 'newIndex.html';
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  });
});

  //=========================================Render navbar=========================================//

$(document).ready(function() {
  function renderNavbarItems() {
    const currentUser = localStorage.getItem('currentUser');
    const navbarItems = $('#navbarItems');
    navbarItems.empty();

    if (currentUser) {
      const user = JSON.parse(currentUser);
      navbarItems.append(`<a href="perfil.html" class="nav-link active">Bienvenido, ${user.name}</a>`);
    } else {
      navbarItems.append('<a class="btn btn-success me-2" href="registrar.html">REGISTRARSE</a>');
      navbarItems.append('<a class="btn btn-success me-2" href="login.html">INGRESAR</a>');
    }
  }

  renderNavbarItems();
});


  //=========================================Registrarse=========================================//


// Función para validar el formulario

$(document).ready(function(){
  function getUsers(){
    const userData = localStorage.getItem('users');
    return userData ? JSON.parse(userData) : [];
  }

  function validarFormulario(){

  var nombre = $("#nombre").val();
  var apellido = $("#apellido").val();
  var correo = $("#correo").val();
  var nombreUsuario = $("#nombreUsuario").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();

  // Expresiones regulares para validar el correo electrónico y el nombre de usuario
  var regexCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

function registrarUsuario(nombre, apellido, correo, nombreUsuario, password){
  let users = getUsers();

  var nuevoUsuario = {
    name: nombre + " " + apellido,
    email: correo,
    username: nombreUsuario,
    password: password
  };

  users.push(nuevoUsuario);
  localStorage.setItem('users', JSON.stringify(users));
  window.location.href = 'newIndex.html';
  }

  $("formRegistro").submit(function(event){
    event.preventDefault();
    if (validarFormulario()){

    }
  });
});



