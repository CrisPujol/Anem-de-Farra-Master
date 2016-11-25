function prepareParams( req, res, next ){
	
	const limit = +req.query.limit || 26;
	const page = +req.query.page || 1;
	const skip = (limit*(page-1))+1;

	req.limit = limit;
	req.skip = skip;

	next()
}

module.exports = prepareParams