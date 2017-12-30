// Load Module Dependencies


var ProfileDal 	= require('../dal/profile');
 
// POST Profiles
exports.creatProfile = function creatProfile(req, res, next){
	var body        = req.body;
	body.post_date  = new Date(); 
	

	ProfileDal.create(body, function createCB(err, Profile){
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'CREATE_Profile_ERROR',
				message: err.message
			});
			return;
		}
		res.status(201);
		res.json(Profile);
	});
};

exports.getCollectionByPagination = function getCollectionByPagination(req, res, next){


	var query = req.query.query || {};
	var qs = req.query;

	ProfileDal.getCollectionByPagination(query, qs, function (err, docs){
		if(err) {
				res.status(500);
				res.json({
					status: 500,
					type: 'TALENT_COLLECTION_PAGINATED_ERROR',
					message: err.message
				});
				return;
		}

		res.json(docs);
	})
}


// GET Profiles/:ProfileId
exports.getProfile = function getProfile(req, res, next){
	var ProfileId = req.params.id;
	ProfileDal.get({_id: ProfileId}, function getCB(err, Profile){
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_Profile_ERROR',
				message: err.message
			});
			return;
		}
		res.json(Profile ||{});
	});

};

// PUT Profiles/:ProfileId
exports.updateProfile = function updateProfile(req, res, next){
	
	var ProfileId = req.params.id;
	var body = req.body;

	ProfileDal.update({_id : ProfileId}, body, function updateCB(err, Profile){

		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'UPDATE_Profile_ERROR',
				message: err.message
			});
			return;
		}
		res.json(Profile || {} );
	});
};

// DELETE Profiles/:ProfileId
exports.removeProfile = function removeProfile(req, res, next){
	var ProfileId = req.params.id;
	
	ProfileDal.delete({_id : ProfileId}, function removeCB(err, Profile){
		
				if(err){
					res.status(500);
					res.json({
						status: 500,
						type: 'REMOVE_Profile_ERROR',
						message: err.message
					});
					return;
				}
				res.json(Profile || {} );
			});
	
};




