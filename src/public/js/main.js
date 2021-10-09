$(function () {
    const socket = io();
    //Obtaining DOM elements from the nickName form
    const $nickForm = $('#nickForm');
    const $nickName = $('#nickName');
    const $nickError = $('#nickError');
    var myName;

    $nickForm.submit(e => {
        e.preventDefault();
        myName = $nickName.val();
        socket.emit('new user', {nombre:myName,w:60,h:63,x:100,y:472}, data =>{
            let existe = typeof data;
            if (existe=='boolean') {
                console.log('ese nomre es repetido');
                $nickError.html(`
                    <div class="alert alert-danger">
                        Ese usuario ya existe
                    </div>`
                );
            }else{
                $('#nickWrap').hide();
                $('#contentWrap').show();
                for (let index = 0; index < usersCliente.length; index++) {
                    if (data[index].nombre === usersCliente[index].nombre) {
                        usersCliente[index] = data[index];
                    }
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
    imgMaquinaExpendedora = new Image();
    imgMesa = new Image();
    imgParlante = new Image();
    imgRotuloBebidas = new Image();
    imgRotuloCyberia = new Image();
    imgRotuloWifi = new Image();
    imgSilla= new Image();
    imgCalabaza= new Image();

    imgMaquinaExpendedora.src = '/data/images/maquinaExpendedora.png';
    imgPersonaje.src = '/data/images/LainF1.png';
    imgFondo.src = '/data/images/fondo.jpg';
    imgMesa.src = '/data/images/mesa.png';
    imgParlante.src = '/data/images/parlante.png';
    imgRotuloBebidas.src = '/data/images/rotuloBebidas.png';
    imgRotuloCyberia.src = '/data/images/rotuloCyberia.png';
    imgRotuloWifi.src = '/data/images/rotuloWifi.png';
    imgSilla.src = '/data/images/silla.png';
    imgCalabaza.src = '/data/images/calabaza.png'
    
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

function dibujarObjetos() {
    ctx.drawImage(imgMaquinaExpendedora, 0, 0, 117, 120, 600, 414, 117, 120);
    ctx.drawImage(imgCalabaza, 0, 0, 40, 34, 10, 534-78, 40, 34);
    ctx.drawImage(imgMesa, 0, 0, 89, 45, 5, 534-45, 89, 45);
    ctx.drawImage(imgParlante, 0, 0, 109, 40, 200, 534-45, 109, 45);
    ctx.drawImage(imgRotuloBebidas, 0, 0, 79, 58, 666, 310, 79, 58);
    ctx.drawImage(imgRotuloCyberia, 0, 0, 295, 131, 110, 50, 295, 131);
    ctx.drawImage(imgRotuloWifi, 0, 0, 27, 35, 50, 380, 27, 35);
    ctx.drawImage(imgSilla, 0, 0, 38, 37, 105, 534-38, 38, 37);
    
}

//Principal bucle
var fps = 55;
setInterval(function () {
    principal();
}, 1000/fps);


function principal() {
    borrarCanvas();
    dibujarFondo(); 
    dibujarObjetos();
    dibujarPersonajes();
}