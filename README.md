#Backbone-Ubiquity

BB-Ubiquity is a boilerplate nodejs webapplication to make SPA with these components :

- express
- backbone
- mongodb (+ mongojs)
- twitter bootstrap

And Babkbone models are **shared between client** (`index.html`) **and server** (`app.js`) !

`Backbone.sync` server side has been re-written : see `backbone.ubiquity.js`.

##Install the boilerplate

**prerequisites :** install MongoDb and nodeJS

	git clone https://github.com/k33g/backbone-ubiquity.git
	cd backbone-ubiquity
	mongod --dbpath db | node app.js

	# or you can use node monitor :

	mongod --dbpath db | nodemon app.js

##Quick-Start

**index.html** is your start page.

###Define Models & Collections

Backnone models and Backbone collections are defined in `models.js` :

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

- `url` and `urlRoot` are only used in client side
- `mongo` is a model and collection property needed by **MongoJS**. It enables to set the collection name (for **MongoDb** persistence)
- You have to declare `model.js` in `index.html` : `<script src="models.js"></script>`
- You have to declare `model.js` in `app.js` : `Models = require('./models.js');`

###Define route in `app.js` and use it in `index.html` : MODELS

It's better if you write controllers, but you can do this (see `app.js`) :

####Create Human model in database : (server side)

	app.post('/human',function(req, res){ //create 

        var johndoe = new Models.Human(req.body);

        johndoe.save({},{
            success : function (model) {
                res.json(model);
            },
            error : function (err) {
                ress.json(err);
            }
        });
    });

#####Call the service (client side) :

    //POST
    var sam = new Models.Human({firstName : "Bobby", lastName : "Ewing"});
    sam.save({},{
        success:function(model){ console.log(model); },
        error:function(err) {}
    });

####Get Human model by Id in database : (server side)

    app.get('/human/:id', function(req, res){

        var johndoe = new Models.Human({id:req.params.id});

        johndoe.fetch({
            success : function(model) {
                res.json(model); //if not found id of model is null
            },
            error : function (err) {
                res.json(err);
            }
        });

    });

#####Call the service (client side) :

    //GET
    var tmp = new Models.Human({id:sam.get("id")});
    tmp.fetch({
        success:function(model){ console.log(model) },
        error:function(err) {}
    });

####Update Human model in database : (server side)

    app.put('/human/:id',function(req, res){ //update

        var johndoe = new Models.Human(req.body);

        johndoe.save({id:req.params.id},{
            success : function (model) {
                res.json(model);
            },
            error : function (err) {
                ress.json(err);
            }
        });

    });

#####Call the service (client side) :

    //PUT
    sam.set("firstName","BOBBY");
    sam.save({},{
        success:function(model){ console.log(model); },
        error:function(err) {}
    });

####Delete Human model by Id in database : (server side)

    app.delete('/human/:id', function(req, res){
        
        var johndoe = new Models.Human({id:req.params.id});

        johndoe.destroy({
            success : function(model) {
                res.json(model);
            },
            error : function (err) {
                res.json(err);
            }
        });

    });

#####Call the service (client side) :

    //DELETE
    sam.destroy({
        success:function(model){ console.log(model) },
        error:function(err) {}
    });

###Define route in `app.js` and use it in `index.html` : COLLECTIONS

####Get All Human models from database : (server side)

    app.get('/humans', function(req, res){
        
        var humans = new Models.Humans();

        humans.fetch({
            success : function(models) {
                res.json(models); 
            },
            error : function (err) {
                res.json(err);
            }
        });

    });

#####Call the service (client side) :

    humans = new Models.Humans();
    humans.fetch({success:function(models){ console.log(models) }});

####Get Some Human models by firstName from database : (server side)

    app.get('/humans/byfirstname/:id', function(req, res){
        
        var firstName = req.params.id
        ,   humans = new Models.Humans();
        
        humans.mongoQuery = {firstName : firstName};

        humans.fetch({
            success : function(models) {
                res.json(models); 
            },
            error : function (err) {
                res.json(err);
            }
        });

    });

#####Call the service (client side) :

    humansWithFirstNameEqualsToBob = new Models.Humans();
    humansWithFirstNameEqualsToBob
        .changeUrl("/humans/byfirstname/Bob")
        .fetch({success:function(models){ console.log(models) }});

####Get Some Human models with parameterized query from database : (server side)

    app.get('/humans/query/:id', function(req, res){
        
        var query = req.params.id
        ,   humans = new Models.Humans();
        
        humans.mongoQuery = JSON.parse(query); //transform query to JSON object

        humans.fetch({
            success : function(models) {
                res.json(models); 
            },
            error : function (err) {
                res.json(err);
            }
        });

    });

#####Call the service (client side) :

    someHumans = (new Models.Humans())
        .changeUrl('/humans/query/{"lastName":"Morane"}')
        .fetch({success:function(models){ console.log(models) }});

**Please note :** url is quoted with `''` and query is a json string : all members (names and values) are quoted with `""`.


##Work in progress

- session and authentication
- bootstrap + less
- more documentation


##Use only backbone.ubiquity.js

	//TODO


