/*============================================
    models.js
============================================*/

/* TODO :
	share src models between server and client

*/



var Backbone = require('backbone');
Backbone.sync = require('./backbone.ubiquity.js').sync;
var mongo = require('./backbone.ubiquity.js').mongo;

//Define mongodb collections and path database
mongo.connect(["humans","animals"],'db'); 

Human = Backbone.Model.extend({
	mongo : "humans", //mongodb collection | mandatory
	defaults : {
		firstName : "John",
		lastName : "Doe"
	}
});


Humans = Backbone.Collection.extend({
	model : Human,
	query : function(q) {
		return this;
	}


});


exports.Human = Human;
exports.Humans = Humans;