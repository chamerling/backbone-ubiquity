/*============================================
 routes.js
 ============================================*/

exports.routes = function (app) {
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
        Controllers.Humans.create(req, res);
    });

    app.put('/human/:id',function(req, res){ //update
        console.log("PUT /human", req.body, req.params.id);
        Controllers.Humans.update(req, res);
    });


    app.get('/human/:id', function(req, res){
        console.log("GET : /human/"+req.params.id);
        Controllers.Humans.getById(req, res);
    });

    app.delete('/human/:id', function(req, res){
        console.log("GET : /human/"+req.params.id);
        Controllers.Humans.delete(req, res);
    });


    //--- Collections ---

    app.get('/humans', function(req, res){
        console.log("GET (ALL) : /humans");
        Controllers.Humans.getAll(req, res);
    });


    app.get('/humans/byfirstname/:id', function(req, res){
        console.log("GET (SOME) : /humans/byfirstname/"+req.params.id);
        Controllers.Humans.getByFirstName(req, res);
    });

    app.get('/humans/query/:id', function(req, res){
        console.log("GET (SOME) : /humans/query/"+req.params.id);
        Controllers.Humans.getSome(req, res);
    });

}



