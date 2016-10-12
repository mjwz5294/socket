var io = require('socket.io')();
var fs = require('fs');

io.on('connection', function (socket) {
    // socket.emit('news', { hello: 'world' });
    // socket.on('notifyNum', function (data) {
    //     console.log('notifyNum:'+data.msg_count);
    // });


    //js错误日志发送
	 fs.watchFile('./public/errorlog/log.txt',function(curr, prev){
	 	   io.sockets.emit('log',{ log: fs.readFileSync('./public/errorlog/log.txt', "utf8") || []});
	 })	
     io.sockets.emit('log',{ log: fs.readFileSync('./public/errorlog/log.txt', "utf8") || []});

    //前端安全日志发送
     fs.watchFile('./public/safelog/safelog.txt',function(curr, prev){
           io.sockets.emit('safelog',{ log: fs.readFileSync('./public/safelog/safelog.txt', "utf8") || []});
     }) 
     io.sockets.emit('safelog',{ safelog: fs.readFileSync('./public/safelog/safelog.txt', "utf8") || []});
});

exports.listen = function (_server) {
    return io.listen(_server);
};