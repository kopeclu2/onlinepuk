import mysql from 'mysql2'
import {conectionObj}from './connectionDb.js'
const localConnection = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'onlinepuk'
}
 const connection = mysql.createPool(localConnection);
  export const promisePool = connection.promise();