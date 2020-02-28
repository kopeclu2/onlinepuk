const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String
    },
    password: {
        type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    img: {
        type: String
    }
  }, {collection: 'users'})
  export const User = mongoose.model('User', userSchema);