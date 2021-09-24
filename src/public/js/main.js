$(function () {
    const socket = io();
    //Obtaining DOM elements from the nickName form
    const $nickForm = $('#nickForm');
    const $nickName = $('#nickName');
    var myName;

    $nickForm.submit(e => {
        e.preventDefault();
        $('#nickWrap').hide();
        $('#contentWrap').show();
        myName = $nickName.val();
        socket.emit('new user', {nombre:myName,w:60,h:63,x:100,y:100}, data =>{
            for (let index = 0; index < usersCliente.length; index++) {
                if (data[index].nombre === usersCliente[index].nombre) {
                    usersCliente[index] = data[index];
                }
            } 
        });
    });

    document.addEventListener('keydown', function(evento){
        if(evento.keyCode == 32){
            socket.emit('movimiento', myName);
            console.log('Te has movido');
        }

    });

    socket.on('update', data => {
        usersCliente = data.slice();
        for (let index = 0; index < usersCliente.length; index++) {
             console.log(usersCliente[index]);
        } 
    });

});

//Juego
var usersCliente = [];
var w=800;
var h=600;
var canvas;
var ctx;
var imgPersonaje, imgFondo;

function cargarImagenes() {
    imgPersonaje = new Image();
    imgFondo = new Image();

    imgPersonaje.src = '/data/images/LainF1.png';
    imgFondo.src = '/data//images/fondo.jpg';
}

function inicializar() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargarImagenes();   
}

function borrarCanvas() {
    ctx.clearRect(0, 0, canvas.w, canvas.h);
}

function dibujarPersonajes() {
    for (let index = 0; index < usersCliente.length; index++) {
        ctx.drawImage(imgPersonaje, 0 , 0, usersCliente[index].w, usersCliente[index].h, usersCliente[index].x, usersCliente[index].y, usersCliente[index].w, usersCliente[index].h);
        ctx.fillStyle="white"; //color de relleno
        ctx.font="bold 15px arial"; //estilo de texto
        ctx.fillText(usersCliente[index].nombre, usersCliente[index].x, usersCliente[index].y-5);
    } 


}

function dibujarFondo() {
    ctx.drawImage(imgFondo, 0, 0, 800, 600, 0, 0, 800, 600);
}


//Principal bucle
var fps = 55;
setInterval(function () {
    principal();
}, 1000/fps);


function principal() {
    borrarCanvas();
    dibujarFondo(); 
    dibujarPersonajes();
}