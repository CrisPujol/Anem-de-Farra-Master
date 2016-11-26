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

		feastsAll.find( filter , function(err, feasts){
			if(err) throw err;
			if(feasts.length === 0){
				const noResult = "Ho sentim, no hi ha resultats";
				res.render("feasts", { feasts, noResult })
			}
			res.render("feasts", { feasts })
		})	
	}


	if (date) {
		var tempdate = date.split("-");
		var formatdate = tempdate[1] + "/" + tempdate[2]  + "/" + tempdate[0];
		const startDate = new Date(formatdate).getTime();

		filter = { startDate }

		feastsAll.find( filter, function(err, feasts){
			if(err) throw err;

			if(feasts.length === 0){
				const noResult = "Ho sentim, no hi ha resultats";
				const opcioB = "Sofà i pel·lícula no és una mala opció";
				res.render("feasts", { feasts, noResult, opcioB })
			}
			else{
				res.render("feasts", { feasts })
			}
		})
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

		feastsAll.find(filterAround, function ( err, feastsAround ){
			if(err) throw err;
			const weekMsg = "Des d'avui fins 7 dies després pots triar:";
			const feasts = feastsAround.map( elem => elem._doc).filter( elem => {
				return elem.finishDate >= currentDate && elem.startDate <= weekLater;
			})

			if(feasts.length === 0){
				const noResult = "Ho sentim, no hi ha resultats";
				res.render("feasts", { feasts , noResult })
			}
			else{
				res.render("feasts", { feasts , weekMsg })
			}
			
		})
	}




	if( kmMax && lat === 0 ){
		const message = req.flash('message')
  		res.render('index', { message, message });
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





