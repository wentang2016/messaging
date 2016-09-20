'use strict';

exports.filter = function(req, res, next) {
	if (req.path == '/login'||req.session.login) {
		next();
		return;
	};

	res.redirect('/login');
};
