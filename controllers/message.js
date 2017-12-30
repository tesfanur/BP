// Load Module Dependencies


var MessageDal 	= require('../dal/message');
 
// POST Messages
exports.creatMessage = function creatMessage(req, res, next){
	var body        = req.body;


	MessageDal.create(body, function createCB(err, Message){
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'CREATE_Message_ERROR',
				message: err.message
			});
			return;
		}
		res.status(201);
		res.json(Message);
	});
};

exports.getCollectionByPagination = function getCollectionByPagination(req, res, next){


	var query = req.query.query || {};
	var qs = req.query;

	MessageDal.getCollectionByPagination(query, qs, function (err, docs){
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



// GET Messages/:MessageId
exports.getMessage = function getMessage(req, res, next){
	var MessageId = req.params.id;
	MessageDal.get({_id: MessageId}, function getCB(err, Message){
		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'GET_Message_ERROR',
				message: err.message
			});
			return;
		}
		res.json(Message ||{});
	});

};

// PUT Messages/:MessageId
exports.updateMessage = function updateMessage(req, res, next){
	
	var MessageId = req.params.id;
	var body = req.body;

	MessageDal.update({_id : MessageId}, body, function updateCB(err, Message){

		if(err){
			res.status(500);
			res.json({
				status: 500,
				type: 'UPDATE_Message_ERROR',
				message: err.message
			});
			return;
		}
		res.json(Message || {} );
	});
};

// DELETE Messages/:MessageId
exports.removeMessage = function removeMessage(req, res, next){
	var MessageId = req.params.id;
	
	MessageDal.delete({_id : MessageId}, function removeCB(err, Message){
		
				if(err){
					res.status(500);
					res.json({
						status: 500,
						type: 'REMOVE_Message_ERROR',
						message: err.message
					});
					return;
				}
				res.json(Message || {} );
			});
	
};




