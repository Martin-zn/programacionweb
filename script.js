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