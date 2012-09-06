/*============================================
    backbone.ubiquity.js
============================================*/

/*### Work In Progress ###*/

var mongo = {
	db : null,
	connect : function(collections, dbpath) {
		this.db = require("mongojs").connect(dbpath, collections);
	}
}
var ObjectId = require("mongojs").ObjectId;

sync = function(method, model, options) {

	this.version = "0.0.1";

	var methodMap = {
		'create': 'POST',
		'update': 'PUT',
		'delete': 'DELETE',
		'read':   'GET'
	};
	var type = methodMap[method];

	if(model.model) { //This is a collection

		switch (type) {
			case "GET":
				if(model.mongoQuery==null || model.mongoQuery==undefined || model.mongoQuery=="") {

					mongo.db[model.mongo].find(function(err, models) {
						if(err) {
							if(options.error) options.error(err);
						} else {
							//TODO : if not found ?
							if(options.success) options.success(models); 
						}
					});

				} else { 

					mongo.db[model.mongo].find(model.mongoQuery, function(err, models) {
						if(err) {
							if(options.error) options.error(err);
						} else {
							//options.success(model.toJSON());
							//TODO : if not found ?
							if(options.success) options.success(models); 
						}
					});
				}

			break;

			default:
				console.log ("???");			
		}



	} else { //This is a model

		switch (type) {

			case "POST": //CREATE
				mongo.db[model.mongo].save(model.toJSON(), function(err, created) {
					model.set("id", created._id );
					if(err) {
						if(options.error) options.error(err);
					} else {
						//options.success(model.toJSON());
						if(options.success) options.success(model); //or created ?
					}
				});
			break;


			case "PUT": //UPDATE
				mongo.db[model.mongo].update({ _id:ObjectId(model.get("id")) }, { $set : model.toJSON() }, function(err, updated) {
					if(err) {
						if(options.error) options.error(err);
					} else {
						if(options.success) options.success(updated[0]);
					}
				} );
			break;


			case "GET": //FETCH
				mongo.db[model.mongo].find({ _id:ObjectId(model.get("id")) }, function(err, founded) {
					if(err) {
						if(options.error) options.error(err);
					} else {
						// --> if undefined (founded) --> not found
						if(founded[0]) { 
							founded[0]._id = undefined;
							if(options.success) options.success(founded[0]);
						} else {
							//console.log("--- NOT FOUNDED ---");
							if(options.success) options.success({id:null});
						}
					}
				});
			break;


			case "DELETE": //DESTROY -->TODO: TO BE TESTED
				mongo.db[model.mongo].remove({ _id:ObjectId(model.get("id")) }, function(err, deleted) {
					if(err) {
						if(options.error) options.error(err);
					} else {
						if(options.success) options.success(deleted);
					}
				});
			break;

			default:
				console.log ("???");

		}

	}


};

exports.sync = sync;
exports.mongo = mongo;