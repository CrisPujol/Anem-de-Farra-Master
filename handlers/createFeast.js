
"use strict"

const createFeast = require('../models/feasts')

function getFeasts(req, res) {

	const user = req.user

	//const { skip, limit, page } = req
	//const options = req.locals.queryOptions;
	const currentDate = new Date().getTime();
	const filter = { finishDate : { $gt: currentDate } };

	feastsAll.find(filter)
		.then( feasts => {
			feastsAll.distinct("region")
				.then( regions => {
					res.render("feasts", { feasts, regions, user })
				})
		})
		.catch( err => new Error(err) )
}

module.exports = createFeast;


























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