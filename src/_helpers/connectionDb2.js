import mysql from 'mysql2'

 const connection = mysql.createPool({
  host     : 'eu-cdbr-west-02.cleardb.net',
  user     : 'bf6d58fc3eb263',
  password : 'baf1a3a1',
  database : 'heroku_830860e9211f00b'
});
  export const promisePool = connection.promise();