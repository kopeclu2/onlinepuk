import mysql from 'mysql2'
import {conectionObj}from './connectionDb.js'
 const connection = mysql.createPool(conectionObj);
  export const promisePool = connection.promise();