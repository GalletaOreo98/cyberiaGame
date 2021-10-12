module.exports = function(io){

    var users = [];
    /*var fps = 55;
    var frameTime=0;
    setInterval(function () {
        frameTime++;
        if (frameTime>=25) {
            console.log(frameTime);
            frameTime=0;
        }
    }, 1000/fps);*/

    
    io.on('connection', socket =>{

        socket.on('new user', (data, cb) =>{
            let existe=false;  
            for (let index = 0; index < users.length; index++) {
                if(users[index].nombre === data.nombre){
                    existe=true;
                };
            }
            if(existe){
                cb(existe);
            }else{
                socket.nickName=data.nombre;
                users.push(data);
                cb(users);
            }
        });

        socket.on('movimiento', data => {
            switch (data.accion) {
                case 'MOV_DERECHA':
                    for (let index = 0; index < users.length; index++) {
                        if (data.nombre === users[index].nombre) {
                            users[index].x = users[index].x + 3;
                            users[index].animacionTime++;
        
                            if (users[index].animacionTime==1) {
                                users[index].estado = 'MOV_DERECHA';
                            }
                            if (users[index].animacionTime==6) {
                                users[index].estado = 'NORMAL';
                                users[index].animacionTime=-2;
                            }
                        }
                    }
                    break;
                case 'MOV_IZQUIERDA':
                    for (let index = 0; index < users.length; index++) {
                        if (data.nombre === users[index].nombre) {
                            users[index].x = users[index].x - 3;
                            users[index].animacionTime++;
        
                            if (users[index].animacionTime==1) {
                                users[index].estado = 'MOV_IZQUIERDA';
                            }
                            if (users[index].animacionTime==6) {
                                users[index].estado = 'NORMAL2';
                                users[index].animacionTime=-2;
                            }
                        }
                    }
                    break;
                case 'STOP':
                    for (let index = 0; index < users.length; index++) {
                        if (data.nombre === users[index].nombre) {
                            switch (users[index].estado) {
                                case 'MOV_DERECHA':
                                    users[index].estado = 'NORMAL'
                                    break;
                                case 'MOV_IZQUIERDA':
                                    users[index].estado = 'NORMAL2'
                                    break;
                                default:
                                    break;
                            }
                            users[index].animacionTime=0;
                        }
                    }
                    break;
                default:
                    break;
            }
            io.sockets.emit('update', users);
        });

        socket.on('disconnect', data => {
            if(!socket.nickName) return;
            for (let index = 0; index < users.length; index++) {
                if(users[index].nombre === socket.nickName){
                    users.splice(index, 1);
                };
            }
            io.sockets.emit('update', users);
        });
    });  
}
