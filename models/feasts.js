const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const collection = "feasts";

// Schema definition
const feastsSchema = mongoose.Schema({
    name: String,
    region: String,
    coordRegion: [ Number ],
    shire: String,
    frequency: String,
    place: String,
    shschedule: String,
    hallweb: String,
    startDate: Number,
    finishDate: Number,
    startDateTxt: String,
    finishDateTxt: String,
    barservice: String,
    parking: String,
    info: String,
    program: String,
    username: String,
    idUser: String
},
{ collection });

// Model definition
feastsSchema.plugin(mongoosePaginate);
var feastsAll = mongoose.model('feastsModel', feastsSchema);

module.exports = feastsAll