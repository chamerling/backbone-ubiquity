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

	this.version = "0.0.0";

	var methodMap = {
		'create': 'POST',
		'update': 'PUT',
		'delete': 'DELETE',
		'read':   'GET'
	};
	var type = methodMap[method];

	/* TODO : 
		- switch instead of if
		- delete
		- collections
		- queries


	*/

	if(!model.model && type == 'POST') { //CREATION

		mongo.db[model.mongo].save(model.toJSON(), function(err, created) {
			model.set("id", created._id );
			if(err) {
				if(options.error) options.error(err);
			} else {
				//options.success(model.toJSON());
				if(options.success) options.success(model); //or created ?
			}
		});
				
	}

	if(!model.model && type == 'PUT') { //SAUVEGARDE (then id exists)



		mongo.db[model.mongo].update({ _id:ObjectId(model.get("id")) }, { $set : model.toJSON() }, function(err, updated) {
			if(err) {
				if(options.error) options.error(err);
			} else {
				if(options.success) options.success(updated[0]);
			}
		} );
	}

	if(!model.model && type == 'GET') { 
		//https://github.com/gett/mongojs/issues/16

		mongo.db[model.mongo].find({ _id:ObjectId(model.get("id")) }, function(err, founded) {
			if(err) {
				if(options.error) options.error(err);
			} else {
				founded[0]._id = undefined;
				if(options.success) options.success(founded[0]);
			}
		});

	}


	if(!model.model && type == 'DELETE') { 

	}


};

exports.sync = sync;
exports.mongo = mongo;