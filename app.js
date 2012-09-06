/*============================================
    app.js
============================================*/

/*--------------------------------------------
    Includes and Declarations
--------------------------------------------*/
var express = require('express')
//,   app = module.exports = express.createServer() --> deprecated
,   app = express()
,   models = require('./models.js');



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

    /*
        $.ajax({
            type:"POST",
            url:"/human",
            data : { firstName : "Bob", lastName : "Morane" } ,
            dataType : 'json',
            error:function(err){ console.log(err); },
            success:function(dataFromServer) { console.log(dataFromServer); }
        })
    */

    app.post('/human',function(req, res){ //create 
        console.log("POST /human", req.body);

        var johndoe = new models.Human(req.body);

        johndoe.save({},{
            success : function (model) {
                res.json(model);
            },
            error : function (err) {
                //TODO ...
                ress.json(err);
            }
        });

    });

    app.put('/human/:id',function(req, res){ //update
        console.log("PUT /human", req.body, req.params.id);

        var johndoe = new models.Human(req.body);

        //johndoe.set("id", req.params.id);

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

    /*
        $.ajax({type:"GET", url:"/human/50478f0d85b2adb531000001",
            error:function(err){ console.log(err); },
            success:function(dataFromServer) { console.log(dataFromServer); }
        })
    */
    app.get('/human/:id', function(req, res){
        console.log("GET : /human/"+req.params.id);
        
        var johndoe = new models.Human({id:req.params.id});
        //johndoe.set("id", req.params.id)

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
        
        var johndoe = new models.Human({id:req.params.id});

        //johndoe.set("id", req.params.id)

        johndoe.destroy({
            success : function(model) {
                res.json(model);
            },
            error : function (err) {
                //TODO ...
                ress.json(err);
            }
        });

    });


}


Routes();
app.listen(3000);
console.log('Express app started on port 3000');