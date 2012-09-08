var io = require('socket.io').listen(8000);

io.set('log level', 1); // reduce logging

io.sockets.on('connection', function (socket) {
    io.sockets.emit('this', { will: 'be received by everyone' });

    var humans = new Models.Humans();

    humans.fetch({
        success : function(models) {

            var totOfHumans = models.length, i;

            setInterval(function(){
                i = Math.floor(Math.random() * totOfHumans);
                //console.log(i,models.at(i));

                socket.emit('message', {
                    firstName:models.at(i).get("firstName"),
                    lastName:models.at(i).get("lastName")
                });

            },200);

            //Math.floor(Math.random() * 6) + 1

        },
        error : function (err) {

        }
    });

    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        io.sockets.emit('user disconnected');
    });
});