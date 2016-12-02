const feastsAll = require('../models/feasts')

function createFeast(req, res) {

	var { name, region, shire, place, shschedule, hallweb, barservice, parking, wc, info, program } = req.body
	var { latitud, longitud } = req.body
	var { startDateFeast , finishDateFeast } = req.body

	const username = req.body.username
	const idUser = req.body.idUser


	latitud = +latitud;
	longitud = +longitud;
	const coordRegion = [ longitud, latitud ];

	//Format seconds start date 
	const startDateTemp = new Date(startDateFeast)
	const startDate = startDateTemp.setHours(00, 00, 00);

	//Format text start date 
	const startDateFeastSplit = startDateFeast.split("-");
	const startDateTxt = startDateFeastSplit[2] + "/" + startDateFeastSplit[1] + "/" + startDateFeastSplit[0];

	//Format seconds finish date 
	const finishDateTemp = new Date(finishDateFeast)
	const finishDate = finishDateTemp.setHours(00, 00, 00);

	//Format text finish date
	const finishDateFeastSplit = finishDateFeast.split("-");
	const finishDateTxt = finishDateFeastSplit[2] + "/" + finishDateFeastSplit[1] + "/" + finishDateFeastSplit[0];


	const data = { name, region, shire, place, shschedule, hallweb, barservice, parking, wc, info, program, coordRegion, startDate, finishDate, startDateTxt, finishDateTxt, username, idUser }
	
	const newFeast = new feastsAll(data);
	newFeast.save((err, feast) =>{
		console.log(feast)
		if(err) return (err)
			res.redirect("/feast/" + feast._id)
	})
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