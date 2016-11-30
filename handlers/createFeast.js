

const feastsAll = require('../models/feasts')

function createFeast(req, res) {

	// const name = req.body.name;
	// const region = req.body.region;
	// const shire = req.body.shire;
	// const place = req.body.place;
	// const shschedule = req.body.shschedule;
	// const hallweb = req.body.hallweb;
	// const barservice = req.body.barservice;
	// const parking = req.body.parking;
	// const wc = req.body.wc;
	// const info = req.body.info;
	// const program = req.body.program;

	// const latitud = +req.body.latitud;
	// const longitud = +req.body.longitud;
	// const coordRegion = [ longitud, latitud ];
	// console.log(coordRegion)


	// const dateReqStart = req.body.startDate;

	// const tempdate = dateReq.split("-");
	// const formatdate = tempdate[1] + "/" + tempdate[2]  + "/" + tempdate[0];
	// const startDate1 = new Date(date)
	// const startDate = startDate1.setHours(00, 00, 00);

	// console.log(startDate)


	// const dateReqFinish = req.body.finishDate;

	// const tempdateF = dateReqFinish.split("-");
	// const formatdateF = tempdateF[1] + "/" + tempdateF[2]  + "/" + tempdateF[0];
	// const finishDate1 = new Date(date)
	// const startDate = startDate1.setHours(00, 00, 00);



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