import mysql from 'mysql2'
import {conectionObj}from './connectionDb.js'
 const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'onlinepuk'
  });
  export const promisePool = connection.promise();