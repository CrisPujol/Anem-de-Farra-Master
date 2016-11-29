"use strict"

const feastsAll = require('../models/feasts');

function getFeastbyId(req, res) {

	const id = req.params.id;

	feastsAll.findById( id )
		.then( feast => {
			feastsAll.distinct("region")
				.then( regions => {
					res.render("details", { feast, regions, anchor: 'anchor' } )
				})
		})
		.catch( err => new Error(err) )
}


module.exports = getFeastbyId;