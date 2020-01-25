import mysql from 'mysql'

const prodConnection  = {
  host     : 'eu-cdbr-west-02.cleardb.net',
  user     : 'bf6d58fc3eb263',
  password : 'baf1a3a1',
  database : 'heroku_830860e9211f00b'
};
const localConnection = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'onlinepuk'
}
export const conectionObj = process.env.NODE_ENV ==='production' ? prodConnection : localConnection;
var connection = mysql.createConnection(conectionObj);
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