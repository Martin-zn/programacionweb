
//Subo loa autores al local storage
$.getJSON('data/autores.json', function(autores){
    console.log("Subiendo Autores");
    const autoresJson = JSON.stringify(autores);
    
    localStorage.setItem('autores', autoresJson);
});

//Subo Las Obras al Local Storage
$.getJSON('data/obras.json', function(obras){
    console.log("Subiendo Obras");
    const obrasJson = JSON.stringify(obras);
    localStorage.setItem('obras', obrasJson);
});

$.getJSON('data/users.json', function(users){
    console.log("Subiendo Usuarios");
    const userJson = JSON.stringify(users);
    localStorage.setItem('users', userJson);
})