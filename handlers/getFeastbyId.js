"use strict"

const feastsAll = require('../models/feasts');

function getFeastbyId(req, res) {

	const id = req.params.id;
	const user = req.user

	feastsAll.findById( id )
		.then( feast => {
			feastsAll.distinct("region")
				.then( regions => {
					res.render("details", { feast, regions, anchor: 'anchor', user } )
				})
		})
		.catch( err => new Error(err) )
}


module.exports = getFeastbyId;