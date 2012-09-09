
Models.User = Backbone.Model.extend({
    urlRoot :"/user",
    mongo : "users", //mongodb collection | mandatory
    defaults : {
        pseudo : "john",
        email : "johndoe@nowhere.com",
        password : "???",
        firstName : "John",
        lastName : "Doe",
        isAdmin : false

    }
});


Models.Users = Backbone.Collection.extend({
    model : Models.User,
    url : "/users",
    mongo : "users", //mongodb collection | mandatory
    changeUrl : function(url) {
        this.url = url;
        return this;
    }
});
