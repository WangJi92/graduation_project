
function db() {
	console.log(1)
	var mysql = require('mysql')
	var dbConfig = {
		host: '127.0.0.1', 
	    user: 'root',
	    password: '',
	    database: 'book_share', 
	    port: 3306,
	    charset : 'UTF8_GENERAL_CI',
	    debug : false
	}
	var connection = mysql.createConnection(dbConfig);
	connection.connect();
}


module.exports = db