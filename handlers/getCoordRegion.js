"use strict"

const feastsAll = require('../models/feasts')

function getCoordRegion(req, res) {

	const region = req.params.region;
	const filter = { region };

	feastsAll.find( filter )
		.then( feast => {
			res.json(feast)
		})
		.catch( err => new Error(err) )	
}

module.exports = getCoordRegion;
























// /* ---- Several Queries to Mongo to send to templates - WAY 1 ---- */

// 	// const promiseFeasts = db.collection("feasts")
// 	// 	.find()
// 	// 	.limit( limit )
// 	// 	.skip( skip )
// 	// 	.toArray()

// 	// const promiseRegions = db.collection("feasts").distinct("region")

// 	// Promise.all([ promiseFeasts, promiseRegions ])
// 	// 	.then( [ feasts, regions ] => res.render('feasts', { feasts, regions } )  ) 

// 	/* ---- Several Queries to Mongo to send to templates - WAY 2 ---- */

// 	// db.collection("feasts")
// 	// 	.find()
// 	// 	.limit( limit )
// 	// 	.skip( skip )
// 	// 	.toArray()
// 	// 	.then( feasts => {

// 	// 		return db.collection("feasts").distinct("region")
// 	// 						.then( regions => res.render('feasts', { feasts, regions } ) )

// 	// 	})
// 	// 	.catch( err => console.log(err) )



// 	// db.collection("feasts")
// 	// 	.find()
// 	// 	.toArray()
// 	// 	.then( feasts => {
// 	// 		res.render('feasts', { feasts } )
// 	// 	})
// 	// 	.catch( err => console.log(err) )