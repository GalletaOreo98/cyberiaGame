$(function () {
    const socket = io();
    //Obtaining DOM elements from the nickName form
    const $nickForm = $('#nickForm');
    const $nickName = $('#nickName');
    const $nickError = $('#nickError');
    var myName;
    console.log('No deberías estar aquí ¿Sabes?');

    $nickForm.submit(e => {
        e.preventDefault();
        myName = $nickName.val();
        socket.emit('new user', {nombre:myName,w:60,h:63,x:100,y:472,estado:'NORMAL',animacionTime:0}, data =>{
            let existe = typeof data;
            if (existe=='boolean') {
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
        let accionData;
        switch (evento.keyCode) {
            case 68:
                accionData = 'MOV_DERECHA';
                socket.emit('movimiento', {nombre:myName,accion:accionData});
                break;
            case 65:
                accionData = 'MOV_IZQUIERDA';
                socket.emit('movimiento', {nombre:myName,accion:accionData});
            default:
                break;
        }

    });

    document.addEventListener('keyup', function(evento){
        let accionData;
        accionData = 'STOP';
        socket.emit('movimiento', {nombre:myName,accion:accionData});
    });

    socket.on('update', data => {
        usersCliente = data.slice();
    });

    document.getElementById("myBtnI").addEventListener("click", function() {
        socket.emit('movimiento', {nombre:myName,accion:'MOV_IZQUIERDA'});
      });

    document.getElementById("myBtnR").addEventListener("click", function() {
        socket.emit('movimiento', {nombre:myName,accion:'MOV_DERECHA'});
    });

});

//Juego
var usersCliente = [];
var w=800;
var h=600;
var canvas;
var ctx;

function cargarImagenes() {
    imgPersonajeRF1 = new Image();
    imgPersonajeRF2 = new Image();
    imgPersonajeIF1 = new Image();
    imgPersonajeIF2 = new Image();
    /*imgFondo = new Image();
    imgMaquinaExpendedora = new Image();
    imgMesa = new Image();
    imgParlante = new Image();
    imgRotuloBebidas = new Image();
    imgRotuloCyberia = new Image();
    imgRotuloWifi = new Image();
    imgSilla= new Image();
    imgCalabaza= new Image();*/
    imgFondo = new Image();
    imgTv= new Image();

    //imgMaquinaExpendedora.src = '/data/images/maquinaExpendedora.png';
    imgPersonajeRF1.src = '/data/images/LainDerechaF1.png';
    imgPersonajeRF2.src = '/data/images/LainDerechaF2.png';
    imgPersonajeIF1.src = '/data/images/LainIzquierdaF1.png';
    imgPersonajeIF2.src = '/data/images/LainIzquierdaF2.png';
    /*imgFondo.src = '/data/images/fondo.jpg';
    imgMesa.src = '/data/images/mesa.png';
    imgParlante.src = '/data/images/parlante.png';
    imgRotuloBebidas.src = '/data/images/rotuloBebidas.png';
    imgRotuloCyberia.src = '/data/images/rotuloCyberia.png';
    imgRotuloWifi.src = '/data/images/rotuloWifi.png';
    imgSilla.src = '/data/images/silla.png';
    imgCalabaza.src = '/data/images/calabaza.png';*/
    imgTv.src = '/data/images/tv.png';
    imgFondo.src = '/data/images/fondoTotal.png';
    
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
        switch (usersCliente[index].estado) {
            case 'NORMAL':
                ctx.drawImage(imgPersonajeRF1, 0 , 0, usersCliente[index].w, usersCliente[index].h, usersCliente[index].x, usersCliente[index].y, usersCliente[index].w, usersCliente[index].h);
                break;
            case 'MOV_DERECHA':
                ctx.drawImage(imgPersonajeRF2, 0 , 0, usersCliente[index].w, usersCliente[index].h, usersCliente[index].x, usersCliente[index].y, usersCliente[index].w, usersCliente[index].h);
                break;
            case 'NORMAL2':
                ctx.drawImage(imgPersonajeIF1, 0 , 0, usersCliente[index].w, usersCliente[index].h, usersCliente[index].x, usersCliente[index].y, usersCliente[index].w, usersCliente[index].h);
                break;
            case 'MOV_IZQUIERDA':
                ctx.drawImage(imgPersonajeIF2, 0 , 0, usersCliente[index].w, usersCliente[index].h, usersCliente[index].x, usersCliente[index].y, usersCliente[index].w, usersCliente[index].h);
                break;
            default:
                break;
        }
        ctx.fillStyle="white"; //color de relleno
        ctx.font="bold 15px arial"; //estilo de texto
        ctx.fillText(usersCliente[index].nombre, usersCliente[index].x, usersCliente[index].y-5);
    } 


}

function dibujarFondo() {
    ctx.drawImage(imgFondo, 0, 0, 800, 600, 0, 0, 800, 600);
}

function dibujarObjetos() {
    /*ctx.drawImage(imgMaquinaExpendedora, 0, 0, 117, 120, 600, 414, 117, 120);
    ctx.drawImage(imgCalabaza, 0, 0, 40, 34, 10, 534-78, 40, 34); 
    ctx.drawImage(imgMesa, 0, 0, 89, 45, 5, 534-45, 89, 45);
    ctx.drawImage(imgParlante, 0, 0, 109, 40, 200, 534-45, 109, 45);
    ctx.drawImage(imgRotuloBebidas, 0, 0, 79, 58, 666, 310, 79, 58);
    ctx.drawImage(imgRotuloCyberia, 0, 0, 295, 131, 110, 50, 295, 131);
    ctx.drawImage(imgRotuloWifi, 0, 0, 27, 35, 50, 380, 27, 35);
    ctx.drawImage(imgSilla, 0, 0, 38, 37, 105, 534-38, 38, 37);*/
    ctx.fillStyle="white";
    ctx.font="bold 15px Courier New"; 
    ctx.fillText('Lets all love Lain', 200, 250);
    ctx.drawImage(imgTv, 0, 0, 448, 99, 110, 200, 448, 99);
    
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