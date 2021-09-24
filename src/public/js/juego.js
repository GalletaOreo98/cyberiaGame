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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarPersonaje() {
    ctx.drawImage(imgPersonaje, 0 , 0, 60, 63, 100, 30, 60, 63);
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
    dibujarPersonaje()
}