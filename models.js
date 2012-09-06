/*============================================
    models.js
============================================*/

(function () {
	/*=== DON'T MODIFIY THIS CODE BETWEEN HERE ===*/
	var root = this
	,	Models;
	
	if (typeof exports !== 'undefined') {
		Models = exports;
		Backbone = require('backbone');
		Backbone.sync = require('./backbone.ubiquity.js').sync;
		mongo = require('./backbone.ubiquity.js').mongo;
	} else {
		Models = root.Models = {};
	}
	/*== AND HERE ===*/


	/*=== Models & Collections Definition ===*/

	if (typeof exports !== 'undefined') {
		//Define mongodb collections and path database
		mongo.connect(["humans","animals"],'db');
	}

	Models.Human = Backbone.Model.extend({
		urlRoot :"/human",
		mongo : "humans", //mongodb collection | mandatory
		defaults : {
			firstName : "John",
			lastName : "Doe"
		}
	});


	Models.Humans = Backbone.Collection.extend({
		model : Models.Human,
		url : "/humans",
		mongo : "humans", //mongodb collection | mandatory
        changeUrl : function(url) {
            this.url = url;
            return this;
        }
	});

	Models.Animal = Backbone.Model.extend({});
	Models.Animals = Backbone.Collection.extend({});


}).call(this);

