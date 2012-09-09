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
    - session and authentication :
        see :
            http://naholyr.fr/2011/07/authentification-et-websocket-avec-node-js-express-et-socket-io/
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

//require('./sockets/sockets.js');

/*--------------------------------------------
	Express parameters
--------------------------------------------*/
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
// Allow parsing cookies from request headers
app.use(express.cookieParser('ilovebackbone'));
// Session management
app.use(express.session({
    secret: "ilovebackbone",
    store :  new express.session.MemoryStore({ reapInterval: 60000 * 10 })
}));

/*--------------------------------------------
	Routes
--------------------------------------------*/
require('./routes.js').routes(app);


//TODO: app.config(?)
app.listen(3000);
console.log('Express app started on port 3000');