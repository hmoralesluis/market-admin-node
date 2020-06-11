const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const AdminSchema = new Schema({
    name: { type: String , required: true},
    email: {type: String, unique: true, lowercase: true},
    password: { type: String, required: true },
    keepsession: {type: Boolean, default: false},
    enabled: {type: Boolean, default: false}


});

module.exports = mongoose.model('Admin', AdminSchema);