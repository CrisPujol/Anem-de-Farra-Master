"use strict"

const feastsAll = require('../models/feasts');

function getFeastFilteredCoord(req, res) {

	const { skip, limit, page } = req

	const lat = +req.body.latitud;
	const lon = +req.body.longitud;
	const kmMax = +req.body.kmMax || 40;


	if( lat && lon ) {

		let km = kmMax;
		let longitude = lon;
		let latitude = lat;
		const user = req.user

		const filterAround = getFilterCoord(latitude, longitude, km);

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
				res.render("feasts", { feasts , weekMsg, regions, anchor: 'anchor', user })
			})
		})
		.catch( err => new Error(err) )
	}




	if( kmMax && lat === 0 ){
		const user = req.user
		feastsAll.distinct("region")
		.then ( regions =>{
			const message = req.flash('message')
			res.render('index', { message, message, regions, anchor: 'anchor', user });
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




module.exports = getFeastFilteredCoord;





