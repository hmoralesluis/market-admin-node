const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const ArticuloSchema = new Schema({
    name: { type: String, required: true, unique: true},
    url: { type: String, default: ''},
    uploadDate: {type: Date,required: true, default: Date.now}   

});

module.exports = mongoose.model('Articulo', ArticuloSchema);