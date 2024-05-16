//Funcion para creacion de tarjetas...

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
        const titulo = $('<h5>').addClass('card-title').text(autor.nombre);
        const descripcion = $('<p>').addClass('card-text').text(autor.descripcion);
  
        tarjetaContenido.append(titulo, descripcion);
        tarjetaBody.append(enlaceImagen, tarjetaContenido);
        tarjeta.append(tarjetaBody);
        cardContainer.append(tarjeta);
      });
    }

//Obtengo los datos del local Storage

$(document).ready(function(){
  const autoresJson = localStorage.getItem('autores');
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
      const imagen = $('<img>').addClass('d-block w-100 carousel-img').attr('src', obra.imagen).attr('alt', obra.titulo);
      carouselItem.append(imagen);
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

