import mongoose from 'mongoose'
// var mongoose = require('mongoose')

const CatSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
})

module.exports = mongoose.model('Cat', CatSchema);
