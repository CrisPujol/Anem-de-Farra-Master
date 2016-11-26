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

			feastsAll.distinct("region", function (err, regions){
				if(err) throw err;
				console.log(regions)
				res.render("details", { feast, nearFeasts, regions } )
			})		
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