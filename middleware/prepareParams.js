function prepareParams( req, res, next ){

	var options = {};
	var { limit=20, page=1 } = req.query || {};
	options.limit = +limit;
	options.page = page;

	req.locals = req.locals || {};
	req.locals.queryOptions = options;

	next();
}

module.exports = prepareParams