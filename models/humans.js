
/*
 if (typeof exports == 'undefined') {
 Models = window.Models = {};
 }
 */

typeof exports === 'undefined' ? Models = window.Models = {}:null;

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

