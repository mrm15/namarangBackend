const mongoose = require('mongoose');
const ordersSchema = new mongoose.Schema({


  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'

  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },

  tableData: {
    type: [Object], // Define the field as an array of objects
    default: [],    // Provide a default empty array
  },

  fileName: {
    type: String,
  },
  fileUrl: {
    type: String,
  },
  description: {
    type: String,
  },

  totalPrice: {
    type: String,
  }
});

module.exports = mongoose.model('orders', ordersSchema)