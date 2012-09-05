#Backbone-Ubiquity

???

##Install the boilerplate

**prerequisite :** install MongoDb

	git clone https://github.com/k33g/backbone-ubiquity.git
	cd backbone-ubiquity
	mongod --dbpath db | node app.js

	# or you can use node monitor :

	mongod --dbpath db | node app.js

###How To try it

In the console navigator :

    //POST
    var sam = new Human({firstName : "Bob", lastName : "Morane"});
    sam.save({},{success:function(model){ console.log(model); }});

    //GET
    var tmp = new Human({id:sam.get("id")});
    tmp.fetch({success:function(model){ console.log(model) }})

    //PUT
    sam.set("firstName","BOBY");
    sam.save({},{success:function(model){ console.log(model); }});

####Define Models & Collection

	//TODO


##Recreate the boilerplate

	npm install -g jamjs // sudo for OSX or linux

	npm install express
	npm install underscore
	npm install backbone
	npm install mongojs

	jam install backbone
	jam install bootstrap
	jam install less
	jam install async

	md db

	//TODO : to be continued


##Use only backbone.ubiquity.js

###Dependencies

You need : underscore, backbone, mongojs. Then :

	npm install underscore
	npm install backbone
	npm install mongojs

###How To

	//TODO


