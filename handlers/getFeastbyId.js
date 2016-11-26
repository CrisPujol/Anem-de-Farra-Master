const feastsAll = require('../models/feasts');



function getFeastbyId(req, res) {

	const id = req.params.id;

	feastsAll.findById( id, function(err, feast){
		if(err) throw err;
		const latitude = feast.coordRegion[1];
		const longitude = feast.coordRegion[0];
		const km = 10;

		const filterArround = getFilterCoord(latitude,longitude,km)

		feastsAll.find(filterArround, function (err, nearFeasts){
			if(err) throw err;
			res.render("details", { feast, nearFeasts } )
		})
		
	})
	
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

module.exports = getFeastbyId;