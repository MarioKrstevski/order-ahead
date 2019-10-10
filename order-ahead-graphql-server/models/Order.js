import mongoose from 'mongoose'
// var mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    orderId: Number,
    date: String,
    restaurantName: String,
    atLocation: Boolean,
    comment: String,
    foodName: String,
    shift: String,
    user: String
})

module.exports = mongoose.model('Order', OrderSchema);
