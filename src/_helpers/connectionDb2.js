import mysql from 'mysql2'
import {conectionObj}from './connectionDb.js'
 const connection = mysql.createPool({
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'bb0fcff5eb8769',
    password : '3109bf24',
    database : 'heroku_6b93634abffb7e6'
  });
  export const promisePool = connection.promise();