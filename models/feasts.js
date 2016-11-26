const mongoose = require('mongoose');

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
    finishDateTxt: String
},
{ collection });

// Model definition
var feastsAll = mongoose.model('feastsModel', feastsSchema);

module.exports = feastsAll