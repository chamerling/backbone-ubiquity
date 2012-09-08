/*============================================
    app.js
    by k33g (github)
    @k33g_org
    http://about.me/ph.charriere

    Run me :
    go to the application directory :
    mongod --dbpath db | node app.js

    License :
    Backnone-Ubiquity is available under the terms of the MIT-License.

    Copyright 2012, Philippe Charrière
============================================*/


/*============================================
    TODO :
    - session and authentication
    - controllers
============================================*/

/*--------------------------------------------
    Includes and Declarations
--------------------------------------------*/
var express = require('express')
,   app = express();



/* === globals === */
Models = {};  //global
Controllers = {};
Backbone = require('backbone');
Backbone.sync = require('./libs/backbone.ubiquity.js').sync;

Backbone.Controller = function() {};
Backbone.Controller.extend = Backbone.Model.extend;

mongo = require('./libs/backbone.ubiquity.js').mongo;

require('./models/models.js');
require('./controllers/controllers.js');

require('./sockets/sockets.js');

/*--------------------------------------------
	Express parameters
--------------------------------------------*/
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use(express.cookieParser('ilovebackbone'));
app.use(express.session({ secret: "ilovebackbone" }));

/*--------------------------------------------
	Routes
--------------------------------------------*/
require('./routes.js').routes(app);


//TODO: app.congig(?)
app.listen(3000);
console.log('Express app started on port 3000');