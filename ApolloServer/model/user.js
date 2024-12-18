const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  genre: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User8', schema)