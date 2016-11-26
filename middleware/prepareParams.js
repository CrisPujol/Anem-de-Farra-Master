function prepareParams( req, res, next ){

	// https://github.com/edwardhotchkiss/mongoose-paginate
	var options = {};
	var { limit=20, page=1 } = req.query || {};
	options.limit = +limit;
	options.page = page;

	req.locals = req.locals || {};
	req.locals.queryOptions = options;

	next();
	
	// const limit = +req.query.limit || 26;
	// const page = +req.query.page || 1;
	// const skip = (limit*(page-1))+1;

	// req.limit = limit;
	// req.skip = skip;

	// next()
}

module.exports = prepareParams