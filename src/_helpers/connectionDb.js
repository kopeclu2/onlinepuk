import mysql from 'mysql'
import logger from 'heroku-logger'

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
const DBHerokuOne = {
  host: "eu-cdbr-west-02.cleardb.net",
  user: "bf6d58fc3eb263",
  password: "baf1a3a1",
  database: "heroku_830860e9211f00b"
}

const herokuOnlinePuk2 = {
  host     : 'eu-cdbr-west-02.cleardb.net',
  user     : 'bb0fcff5eb8769',
  password : '3109bf24',
  database : 'heroku_6b93634abffb7e6'
}
export const conectionObj = process.env.NODE_ENV ==='production' ? DBHerokuOne : localConnection;
var connection= mysql.createConnection(conectionObj);
const connect = () => {
  connection = mysql.createConnection(conectionObj);
  connection.connect(function(err) {
    if (err) {
      logger.error('error connecting: ' + err.stack);
      setTimeout(()=>{
        
        connect()
      },2000)
      
      return;
    }
    connection.on('error', function() {
      logger.error('ERROR databse mySQL closed')
      connection.end()
      connect()
    });
    
    logger.info('MYSQL 1 connected as id ' + connection.threadId);
  });
}

  export default {
        connect,
        connection
  }