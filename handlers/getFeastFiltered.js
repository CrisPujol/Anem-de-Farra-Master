"use strict"
const feastsAll = require('../models/feasts');

function getFeastFiltered(req, res) {

	const { skip, limit, page } = req

	const region = req.body.regionFeasts;
	const date = req.body.dataStart;

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

				else{
					var firstfeast = feasts[0];
					const latitude = firstfeast.coordRegion[1];
					const longitude = firstfeast.coordRegion[0];
					const km = 10;

					const filterArround = getFilterCoord(latitude,longitude,km)

					feastsAll.find(filterArround)
						.then( nearFeasts => {
							res.render("feasts", { feasts, regions, nearFeasts })
						})	
				}
				
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

		filter = { region, startDate };

		feastsAll.find( filter )
			.then( feasts => {
				feastsAll.distinct("region")
					.then( regions => {
						console.log(feasts)
						res.render("feasts", { feasts, regions })
					})
			})
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





