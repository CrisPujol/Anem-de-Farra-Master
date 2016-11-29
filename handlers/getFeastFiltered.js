"use strict"
const feastsAll = require('../models/feasts');

function getFeastFiltered(req, res) {

	const { skip, limit, page } = req

	const region = req.body.regionFeasts;
	const date = req.body.dataStart;

	let filter;

	if(region && date){

		const user = req.user

		let tempdate = date.split("-");
		let formatdate = tempdate[1] + "/" + tempdate[2]  + "/" + tempdate[0];
		const startDate = new Date(formatdate).getTime();

		filter = { region, startDate };

		feastsAll.find( filter )
		.then( feasts => {
			feastsAll.distinct("region")
			.then( regions => {
				res.render("feasts", { feasts, regions, anchor: 'anchor', user })
			})
		})
	}


	else if (region) {
		filter = { region }

		const user = req.user

		feastsAll.find(filter)
		.then( feasts => {
			feastsAll.distinct("region")
			.then( regions =>{
				if(feasts.length === 0){
					const noResult = "Ho sentim, no hi ha resultats";
					res.render("feasts", { feasts, noResult, regions, anchor: 'anchor', user })
				}

				else{
					const firstfeast = feasts[0];
					const latitude = firstfeast.coordRegion[1];
					const longitude = firstfeast.coordRegion[0];
					const km = 10;

					const filterArround = getFilterCoord(latitude,longitude,km)

					feastsAll.find(filterArround)
					.then( nearFeasts => {
						res.render("feasts", { feasts, regions, nearFeasts, anchor: 'anchor', user })
					})	
				}
				
			})
		})
		.catch( err => new Error(err) )	
	}


	else  {

		const user = req.user

		let tempdate = date.split("-");
		let formatdate = tempdate[1] + "/" + tempdate[2]  + "/" + tempdate[0];
		const startDate = new Date(formatdate).getTime();

		filter = { startDate }
		feastsAll.find(filter)
		.then ( feasts => {
			feastsAll.distinct("region")
			.then( regions => {
				if(feasts.length === 0){
					const noResult = "Ho sentim, no hi ha resultats";
					const opcioB = "Sofà i pel·lícula no és una mala opció";
					res.render("feasts", { feasts, noResult, opcioB, regions, anchor: 'anchor', user })
				}
				else{
					res.render("feasts", { feasts, regions, anchor: 'anchor', user })
				}
				
			})
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





