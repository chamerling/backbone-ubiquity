/*============================================
    app.js
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
//,   app = module.exports = express.createServer() --> deprecated
,   app = express()
,   Models = require('./models.js');



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

function Routes() {

    /*
        $.ajax({type:"GET", url:"/getsessionid",
            error:function(err){ console.log(err); },
            success:function(dataFromServer) { console.log(dataFromServer); }
        })
    */
    app.get('/getsessionid',function(req, res){
        console.log(req.sessionID);
        res.json({sessionID:req.sessionID});
    });


    app.post('/human',function(req, res){ //create 
        console.log("POST /human", req.body);

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

    app.put('/human/:id',function(req, res){ //update
        console.log("PUT /human", req.body, req.params.id);

        var johndoe = new Models.Human(req.body);

        johndoe.save({id:req.params.id},{
            success : function (model) {
                res.json(model);
            },
            error : function (err) {
                //TODO ...
                ress.json(err);
            }
        });

    });    


    app.get('/human/:id', function(req, res){
        console.log("GET : /human/"+req.params.id);
        
        var johndoe = new Models.Human({id:req.params.id});

        johndoe.fetch({
            success : function(model) {
                res.json(model); //if not found id of model is null
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });

    });

    app.delete('/human/:id', function(req, res){
        console.log("GET : /human/"+req.params.id);
        
        var johndoe = new Models.Human({id:req.params.id});

        johndoe.destroy({
            success : function(model) {
                res.json(model);
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });

    });


    //--- Collections ---

    app.get('/humans', function(req, res){
        console.log("GET (ALL) : /humans");
        
        var humans = new Models.Humans();

        humans.fetch({
            success : function(models) {
                res.json(models); 
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });

    });


    app.get('/humans/byfirstname/:id', function(req, res){
        console.log("GET (SOME) : /humans/byfirstname/"+req.params.id);
        
        var firstName = req.params.id
        ,   humans = new Models.Humans();
        
        humans.mongoQuery = {firstName : firstName};

        humans.fetch({
            success : function(models) {
                res.json(models); 
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });

    });

    app.get('/humans/query/:id', function(req, res){
        console.log("GET (SOME) : /humans/query/"+req.params.id);
        
        var query = req.params.id
        ,   humans = new Models.Humans();
        
        humans.mongoQuery = JSON.parse(query);
        //humans.mongoQuery = query;

        humans.fetch({
            success : function(models) {
                res.json(models); 
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });

    });



}


Routes();
app.listen(3000);
console.log('Express app started on port 3000');