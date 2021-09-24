module.exports = function(io){

    var users = [];
    
    io.on('connection', socket =>{

        socket.on('new user', (data, cb) =>{
            users.push(data);
            cb(users);
            for (let index = 0; index < users.length; index++) {
                console.log(users[index].nombre);
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
    });  
}
