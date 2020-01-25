import mysql from 'mysql'

const prodConnection  = {
  host     : 'eu-cdbr-west-02.cleardb.net',
  user     : 'bb0fcff5eb8769',
  password : '3109bf24',
  database : 'heroku_6b93634abffb7e6'
};
const localConnection = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'onlinepuk'
}
export const conectionObj = process.env.NODE_ENV ==='production' ? prodConnection : localConnection;
var connection = mysql.createConnection({
  host     : 'eu-cdbr-west-02.cleardb.net',
  user     : 'bb0fcff5eb8769',
  password : '3109bf24',
  database : 'heroku_6b93634abffb7e6'
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