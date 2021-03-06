const feastsAll = require('../models/feasts');

function getFeastFiltered(req, res) {

	const { skip, limit, page } = req

	const region = req.body.regionFeasts;
	const date = req.body.dataStart;

	let filter;

	if(region && date){

		const user = req.user

		const startDateTemp = new Date(date)
		const startDate = startDateTemp.setHours(00, 00, 00);

		filter = { region, startDate };

		feastsAll.find( filter )
		.then( feasts => {
			feastsAll.distinct("region")
			.then( regions => {
				if(feasts.length === 0){
					const noResult = "Ho sentim, no hi ha resultats";
					res.render("feasts", { feasts, regions, anchor: 'anchor', user, noResult })
				}
				else{
					res.render("feasts", { feasts, regions, anchor: 'anchor', user })
				}		
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


	else if(date){

		const user = req.user

		const startDateTemp = new Date(date)
		const startDate = startDateTemp.setHours(00, 00, 00);

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





