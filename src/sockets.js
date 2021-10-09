module.exports = function(io){

    var users = [];
    
    io.on('connection', socket =>{

        socket.on('new user', (data, cb) =>{
            let existe=false;  
            for (let index = 0; index < users.length; index++) {
                if(users[index].nombre === data.nombre){
                    existe=true;
                };
            }
            if(existe){
                console.log('Este usuario ya existe'+ typeof existe);
                cb(existe);
            }else{
                socket.nickName=data.nombre;
                users.push(data);
                cb(users);
                for (let index = 0; index < users.length; index++) {
                    console.log(users[index].nombre);
                }
            }
        });

        socket.on('movimiento', data => {
            for (let index = 0; index < users.length; index++) {
                if (data === users[index].nombre) {
                    users[index].x = users[index].x + 5;
                    console.log('se movio el pana ' + data);
                }
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
            console.log('an user disconnected');
        });
    });  
}
