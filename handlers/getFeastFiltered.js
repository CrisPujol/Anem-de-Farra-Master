const feastsAll = require('../models/feasts');

function getFeastFiltered(req, res) {

	const { skip, limit, page } = req

	const region = req.body.regionFeasts;
	const date = req.body.dataStart;
	const lat = +req.body.latitud;
	const lon = +req.body.longitud;
	const kmMax = +req.body.kmMax || 40;

	var filter;


	if (region) {
		filter = { region }

		feastsAll.find(filter)
		.then( feasts => {
			feastsAll.distinct("region")
			.then( regions =>{
				if(feasts.length === 0){
					const noResult = "Ho sentim, no hi ha resultats";
					res.render("feasts", { feasts, noResult, regions })
				}
				res.render("feasts", { feasts, regions })
			})
		})
		.catch( err => new Error(err) )	
	}


	if (date) {
		var tempdate = date.split("-");
		var formatdate = tempdate[1] + "/" + tempdate[2]  + "/" + tempdate[0];
		const startDate = new Date(formatdate).getTime();

		filter = { startDate }
		feastsAll.find(filter)
		.then ( feasts => {
			feastsAll.distinct("region")
			.then( regions => {
				if(feasts.length === 0){
					const noResult = "Ho sentim, no hi ha resultats";
					const opcioB = "Sofà i pel·lícula no és una mala opció";
					res.render("feasts", { feasts, noResult, opcioB, regions })
				}
				res.render("feasts", { feasts, regions })
			})
		})
		.catch( err => new Error(err) )
	}


	if(region && date){
		var tempdate = date.split("-");
		var formatdate = tempdate[1] + "/" + tempdate[2]  + "/" + tempdate[0];
		const startDate = new Date(formatdate).getTime();

		filter = { region };

		feastsAll.find(filter, function (err, feastsRegion){
			console.log(feastsRegion)
			if(err) throw err;

			const feasts = feastsRegion.map( elem => elem._doc).filter( elem => {
				return elem.startDate === startDate;
			})
			console.log("-------------------------------")
			console.log(feasts)
			res.render("feasts", { feasts })
		})
	}



	if( lat && lon ){
		var km = kmMax;
		var longitude = lon;
		var latitude = lat;

		filterAround = getFilterCoord(latitude, longitude, km);

		const currentDate = new Date().getTime();
		const weekLater = new Date(currentDate).getTime() + 7 * 24 * 60 * 60 * 1000; 

		feastsAll.find(filterAround)
			.then( feastsAround => {
				feastsAll.distinct("region")
				.then ( regions => {
					const weekMsg = "Des d'avui fins 7 dies després pots triar:";
					const feasts = feastsAround.map( elem => elem._doc).filter( elem => {
						return elem.finishDate >= currentDate && elem.startDate <= weekLater;
					})
					if(feasts.length === 0){
						const noResult = "Ho sentim, no hi ha resultats";
						res.render("feasts", { feasts , noResult, regions })
					}
					res.render("feasts", { feasts , weekMsg, regions })
				})
			})
			.catch( err => new Error(err) )
	}




	if( kmMax && lat === 0 ){
		feastsAll.distinct("region")
			.then ( regions =>{
				const message = req.flash('message')
				res.render('index', { message, message, regions });
			})
			.catch( err => new Error(err) )
	}

}

function getFilterCoord( latitude, longitude, km) {

	return {
		"coordRegion" : {
			$near: {
				$geometry: {
					type: "Point" ,
					coordinates: [ longitude , latitude ]
				},
				$maxDistance: km*1000
			}
		}
	}

}




module.exports = getFeastFiltered;





