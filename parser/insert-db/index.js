const MongoClient = require('mongodb').MongoClient
const festes = require('./festes-array-details.js')
const url = "mongodb://localhost:27017/anemdefarra"

MongoClient.connect(url, (err, db) => {
	if (err) throw err;
	console.log("Connected to DB...")

	db.collection("feasts")
		.insert(festes)
		.then( () => console.log("Data inserted OK!!") )
		.then( () => db.close() )

});




