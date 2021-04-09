exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
        console.log("nuova persona");
      socket.on('file1Event', function () {
        console.log('file1Event triggered');
      });
    });
  }