import mysql from 'mysql'


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'onlinepuk'
  });
const connect = () => {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
}
const connect2 = () => {

}

  export default {
        connect,
        connection
  }