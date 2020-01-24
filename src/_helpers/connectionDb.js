import mysql from 'mysql'


var connection = process.env.NODE_ENV === 'production' ? mysql.createConnection({
  host     : 'md37.wedos.net',
  user     : 'a212313_puk',
  password : 'Monstercar494@ ',
  database : 'd212313_puk'
}) : mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'onlinepuk'
  })
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