// const feastsAll = require('../models/feasts')

// function getFeasts(req, res) {


// 	const options = req.locals.queryOptions;
// 	const currentDate = new Date().getTime();
// 	const filter = { finishDate : { $gt: currentDate } };
// 	console.log(options)

// 	feastsAll.paginate( filter, options, function(err, feasts){
// 		if(err) throw err;
// 		console.log(feasts)
// 		res.render("feasts" , { feasts } )
// 	})
					
		
// }

// module.exports = getFeasts;






const feastsAll = require('../models/feasts')

function getFeasts(req, res) {

	//const { skip, limit, page } = req
	//const options = req.locals.queryOptions;
	const currentDate = new Date().getTime();
	const filter = { finishDate : { $gt: currentDate } };

	feastsAll.find(filter)
		.then( feasts => {
			feastsAll.distinct("region")
				.then( regions => {
					res.render("feasts", { feasts, regions })
				})
		})
		.catch( err => new Error(err) )
}

module.exports = getFeasts;


























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