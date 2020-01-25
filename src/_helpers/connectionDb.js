import mysql from 'mysql'


var connection = mysql.createConnection({
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'bf6d58fc3eb263',
    password : 'baf1a3a1',
    database : 'heroku_830860e9211f00b'
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