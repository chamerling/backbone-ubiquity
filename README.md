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

Or, instead of `git clone` command, you can download the zip : [https://github.com/k33g/backbone-ubiquity/zipball/master](https://github.com/k33g/backbone-ubiquity/zipball/master).

- unzip
- change directory
- launch `mongod --dbpath db | node app.js`

##Quick-Start

**index.html** is your start page.

###Define Models & Collections

Backbone models and Backbone collections are declared in `models/models.js`. And **in `models.js` you have to declare MongoDB collections : **

    if (typeof exports == 'undefined') { //Client side
        Models = window.Models = {};
    } else { //Server side
        mongo.connect(["humans","animals"],'db');
        require('./animals.js');
        require('./humans.js');
    }

Then, code your models/collections in `models` directory, see `models/humans.js`

	/*=== Models & Collections Definition ===*/

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


- `url` and `urlRoot` are only used in client side
- `mongo` is a model and collection property needed by **MongoJS**. It enables to set the collection name (for **MongoDb** persistence)
- You have to declare `model.js`, 'human.js', etc. ... in `index.html` :

    <script src="models/models.js"></script>
    <script src="models/humans.js"></script>

###Define Controllers

Normally, Backbone.Controller doesn't exist. I've just defined for server side convenience, like that :

    Backbone.Controller = function() {};
    Backbone.Controller.extend = Backbone.Model.extend;

You can code your controllers in `controllers` directory. Don't forget to declare each controller in `controllers/controllers.js` :

    require('./humans.js');

And ie `humans.js` :


    Controllers.Humans = Backbone.Controller.extend({},{ //Static

        create:function(req, res) {
            var johndoe = new Models.Human(req.body);

            johndoe.save({},{
                success : function (model) {
                    res.json(model);
                },
                error : function (err) {
                    res.json(err);
                }
            });
        },

        update:function(req, res) {
            var johndoe = new Models.Human(req.body);

            johndoe.save({id:req.params.id},{
                success : function (model) {
                    res.json(model);
                },
                error : function (err) {
                    res.json(err);
                }
            });
        },
        getById:function(req, res) {
            var johndoe = new Models.Human({id:req.params.id});

            johndoe.fetch({
                success : function(model) {
                    res.json(model); //if not found id of model is null
                },
                error : function (err) {
                    res.json(err);
                }
            });
        },
        delete : function (req, res) {
            var johndoe = new Models.Human({id:req.params.id});

            johndoe.destroy({
                success : function(model) {
                    res.json(model);
                },
                error : function (err) {
                    res.json(err);
                }
            });
        },
        getAll : function (req, res) {
            var humans = new Models.Humans();

            humans.fetch({
                success : function(models) {
                    res.json(models);
                },
                error : function (err) {
                    res.json(err);
                }
            });
        },
        getByFirstName : function (req, res) {
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
        },
        getSome : function (req, res) {
            var query = req.params.id
                ,   humans = new Models.Humans();

            humans.mongoQuery = JSON.parse(query);
            //humans.mongoQuery = query;

            humans.fetch({
                success : function(models) {
                    res.json(models);
                },
                error : function (err) {
                    res.json(err);
                }
            });
        }

    });


###Define routes in `routes.js`

    exports.routes = function (app) {

        app.get('/getsessionid',function(req, res){
            console.log(req.sessionID);
            res.json({sessionID:req.sessionID});
        });

        //etc. ...

    }

####Create Human model in database : (server side)

    app.post('/human',function(req, res){ //create
        console.log("POST /human", req.body);
        Controllers.Humans.create(req, res);
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
        console.log("GET : /human/"+req.params.id);
        Controllers.Humans.getById(req, res);
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
        console.log("PUT /human", req.body, req.params.id);
        Controllers.Humans.update(req, res);
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
        console.log("GET : /human/"+req.params.id);
        Controllers.Humans.delete(req, res);
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
        console.log("GET (ALL) : /humans");
        Controllers.Humans.getAll(req, res);
    });

#####Call the service (client side) :

    humans = new Models.Humans();
    humans.fetch({success:function(models){ console.log(models) }});

####Get Some Human models by firstName from database : (server side)

    app.get('/humans/byfirstname/:id', function(req, res){
        console.log("GET (SOME) : /humans/byfirstname/"+req.params.id);
        Controllers.Humans.getByFirstName(req, res);
    });

#####Call the service (client side) :

    humansWithFirstNameEqualsToBob = new Models.Humans();
    humansWithFirstNameEqualsToBob
        .changeUrl("/humans/byfirstname/Bob")
        .fetch({success:function(models){ console.log(models) }});

####Get Some Human models with parameterized query from database : (server side)

    app.get('/humans/query/:id', function(req, res){
        console.log("GET (SOME) : /humans/query/"+req.params.id);
        Controllers.Humans.getSome(req, res);
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

##License :

Backnone-Ubiquity is available under the terms of the MIT-License.
Copyright 2012, Philippe Charrière