var mongoose = require('mongoose');

// note: your host/port number may be different!
mongoose.connect('mongodb://localhost:27017/Pothole');

var Schema = mongoose.Schema;

var locationschema = new Schema({
    latitude: { type: Number, required: true, unique: true },
    longitude: { type: Number, required: true, unique: true },

});


module.exports = mongoose.model('location', locationschema);
