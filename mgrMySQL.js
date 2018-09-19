//数据库如果断开会一直尝试重新连接

var mysql = require('mysql');

function mgrMySQL(){
	gLog( "mgrMySQL: init" );
	this.tryConnect()
}

mgrMySQL.prototype.tryConnect = function() {
	this.connection = mysql.createConnection({
	    host: Config.MY_SQL_HOST,
	    user: Config.MY_SQL_USERNAME,
	    password: Config.MY_SQL_PASSWORD,
	    database:Config.MY_SQL_DATABASE
	});

    this.connection.connect(function (err) {
        if (err) {
            this._isConnected = false;

            gLog('mgrMySQL error when connecting to db:', err);
            //连接错误，2秒重试
            setTimeout(this.tryConnect.bind(this) , 2000);
        } else {
            this._isConnected = true;

            gLog('mgrMySQL connect');
        }
    }.bind(this));

    this.connection.on('error', function (err) {
    	this._isConnected = false;

        gLog('mgrMySQL error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            this.tryConnect();
        } else {
            // throw err;
            gLog( "mgrMySQL error", err )
        }
    }.bind(this));
}

mgrMySQL.prototype.query = function( sql, data, callback ) {
	if( this.isConnected() ) {
	   this.connection.query( sql, data, callback );
	}
}

mgrMySQL.prototype.isConnected = function() {
    return this._isConnected;
}

mgrMySQL.prototype.getConnection = function() {
    return this.connection
}

module.exports=new mgrMySQL();