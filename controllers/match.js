// Load Module Dependencies
//Match

var MatchDal 	= require('../dal/match');
 
// POST Matchs
exports.creatMatch = function creatMatch(req, res, next){
	var body        = req.body;
	

	MatchDal.create(body, function createCB(err, Match){
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'CREATE_Match_ERROR',
				message: err.message
			});
			return;
		}
		res.status(201);
		res.json(Match);
	});
};

exports.getCollectionByPagination = function getCollectionByPagination(req, res, next){


	var query = req.query.query || {};
	var qs = req.query;

	MatchDal.getCollectionByPagination(query, qs, function (err, docs){
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

// GET Matchs/:MatchId
exports.getMatch = function getMatch(req, res, next){
	var MatchId = req.params.id;
	MatchDal.get({_id: MatchId}, function getCB(err, Match){
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_Match_ERROR',
				message: err.message
			});
			return;
		}
		res.json(Match ||{});
	});

};

// PUT Matchs/:MatchId
exports.updateMatch = function updateMatch(req, res, next){
	
	var MatchId = req.params.id;
	var body = req.body;

	MatchDal.update({_id : MatchId}, body, function updateCB(err, Match){

		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'UPDATE_Match_ERROR',
				message: err.message
			});
			return;
		}
		res.json(Match || {} );
	});
};

// DELETE Matchs/:MatchId
exports.removeMatch = function removeMatch(req, res, next){
	var MatchId = req.params.id;
	
	MatchDal.delete({_id : MatchId}, function removeCB(err, Match){
		
				if(err){
					res.status(500);
					res.json({
						status: 500,
						type: 'REMOVE_Match_ERROR',
						message: err.message
					});
					return;
				}
				res.json(Match || {} );
			});
	
};




