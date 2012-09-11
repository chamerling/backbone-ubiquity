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

    app.get('/session-index', function (req, res, next) {
        // Increment "index" in session
        req.session.index = (req.session.index || 0) + 1;
        // View "session-index.ejs"
        res.json('session-index', {
            "index":  req.session.index,
            "sessId": req.sessionID
        });
    });
    /*=== HUMANS ===*/
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


    app.get('/humans/byfirstname/:firstname', function(req, res){
        console.log("GET (SOME) : /humans/byfirstname/"+req.params.firstname);
        Controllers.Humans.getByFirstName(req, res);
    });

    app.get('/humans/query/:query', function(req, res){
        console.log("GET (SOME) : /humans/query/"+req.params.query);
        Controllers.Humans.getSome(req, res);
    });

    /*=== USERS ===*/
    app.post('/user',function(req, res){ //create
        console.log("POST /user", req.body);
        Controllers.Users.create(req, res);
    });

    app.put('/user/:id',function(req, res){ //update
        console.log("PUT /user", req.body, req.params.id);
        Controllers.Users.update(req, res);
    });

    //Protected routes
    app.get('/user/:id', [Controllers.Users.haveToBeAdmin], function(req, res, next){
        console.log("GET : /user/"+req.params.id);
        Controllers.Users.getById(req, res);
    });



    app.delete('/user/:id',function(req, res){
        console.log("GET : /user/"+req.params.id);
        Controllers.Users.delete(req, res);
    });


    //--- Collections ---

    app.get('/users', function(req, res){
        console.log("GET (ALL) : /users");
        Controllers.Users.getAll(req, res);
    });

    //app.post('/users/login/:login', function(req, res){
    app.post('/users/login', function(req, res){
        console.log("GET (SOME) : /users/login/"+req.body);
        Controllers.Users.authenticate(req, res);
    });


}



