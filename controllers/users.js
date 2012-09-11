
Controllers.Users = Backbone.Controller.extend({},{ //Static

    addUser : function (user, callback) {
        var users = new Models.Users();
        users.mongoQuery = {pseudo : user.get("pseudo") };
        users.fetch({
            success : function(models) {

                if(models.length>0) {
                    if(callback) callback({error: "Already exists"});

                } else {
                    if(user.get("pseudo") && user.get("password")) {
                        user.save({},{
                            success : function (model) {
                                if(callback) callback(model);
                            },
                            error : function (err) {
                                if(callback) callback(err);
                            }
                        });
                    } else {
                        if(callback) callback({error: "You need a Pseudo and a password"});
                    }

                }

            },
            error : function (err) {
                if(callback) callback(err);
            }
        });
    },

    create:function(req, res) {
        if(Controllers.Users.isAdmin(req)) {
            var johndoe = new Models.User(req.body)
            ,   users = new Models.Users();

            users.mongoQuery = {pseudo : johndoe.get("pseudo") };

            users.fetch({
                success : function(models) {

                    if(models.length>0) {
                        //Already exists
                        //console.log("Already exists : ", models[0], models.at(0));

                        res.json({error: "Already exists"});

                    } else {
                        if(johndoe.get("pseudo") && johndoe.get("password")) {
                            johndoe.save({},{
                                success : function (model) {
                                    res.json(model);
                                },
                                error : function (err) {
                                    res.json(err);
                                }
                            });
                        } else {
                            res.json({error: "You need a Pseudo and a password"});
                        }

                    }

                },
                error : function (err) {
                    //TODO ...
                    res.json(err);
                }
            });

        } else {
            res.json({error:"You have to be administrator"});
            //res.json({},{error:"You have to be administrator"});
        }





    },

    update:function(req, res) {
        var johndoe = new Models.User(req.body);

        johndoe.save({id:req.params.id},{
            success : function (model) {
                res.json(model);
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });
    },
    getById:function(req, res) {
        var johndoe = new Models.User({id:req.params.id});

        johndoe.fetch({
            success : function(model) {
                res.json(model); //if not found id of model is null
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });
    },
    delete : function (req, res) {

        if(Controllers.Users.isAdmin(req)) {
            //console.log("YOU ARE ADMINISTRATOR COOL");
            var johndoe = new Models.User({id:req.params.id});

            johndoe.destroy({
                success : function(model) {
                    res.json({message:"OK"});
                },
                error : function (err) {
                    //TODO ...
                    err.txt = "Houston ... We've got a problem :("
                    res.json(err);
                }
            });
        } else {
            //console.log("YOU ARE NOT ADMINISTRATOR BAD");
            //TODO:ADDCODEERR ?
            res.json({error:"You have to be administrator"});
        }

    },
    getAll : function (req, res) {
        var users = new Models.Users();

        users.fetch({
            success : function(models) {
                res.json(models);
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });
    },

    getCurrentAuthenticatedUser : function(req, res) {

    },

    //Controllers.Users.isAuthenticated
    isAuthenticated : function (req) {
        if (req.session.pseudo) {
            return true;
        } else {
            return false;
        }
    },

    isAdmin : function (req) {
        if (req.session.isAdmin) {
            return true;
        } else {
            return false;
        }
    },

    //Controllers.Users.haveToBeAdmin
    /* Route sample :
     app.get('/user/:id', [Controllers.Users.haveToBeAdmin], function(req, res, next){

        Controllers.Users.getById(req, res);
     });


     */
    haveToBeAdmin : function (req, res, next) {
        console.log("NEEDS ADMIN");
        if (req.session.isAdmin) {
            next();
        } else {
            res.json({error:"You have to be administrator"});
        }
    },
    //Controllers.Users.haveToBeAuthenticated
    haveToBeAuthenticated : function (req, res, next) {
        console.log("NEEDS AUTHENTICATED");
        if (req.session.pseudo) {
            next();
        } else {
            res.json({error:"You have to be authenticated"});
        }
    },

    authenticate : function (req, res) {
        //http://naholyr.fr/2011/07/authentification-et-websocket-avec-node-js-express-et-socket-io/
        var pseudo = req.body.pseudo
        ,   password = req.body.password
        ,   users = new Models.Users();

        //console.log(pseudo, password);
        if(pseudo && password) {
            users.mongoQuery = {pseudo : pseudo, password : password };

            users.fetch({
                success : function(models) {
                    if(models.length>0) {
                        //console.log(models);  //models is a backbone collection
                        var authenticatedUser = models.at(0);//first or models.models[0]

                        req.sessionStore.all(function(err, sessions) {
                            if(!err) {
                                var found = false;
                                for (var i=0; i<sessions.length; i++) {
                                    var session = JSON.parse(sessions[i]); // Si les sessions sont stockées en JSON
                                    if (session.pseudo == req.body.pseudo) {
                                        err = "User name already used by someone else";
                                        found = true;
                                        break;
                                    }
                                }
                            }

                            if(err) {
                                res.json({error : err})
                            } else {
                                req.session.pseudo = req.body.pseudo;  //TODOADD user to sessionstore ???
                                req.session.isAdmin = authenticatedUser.get("isAdmin");

                                console.log("SESSION : ", req.session);

                                res.json({
                                    user : {
                                        email : authenticatedUser.get("email"),
                                        pseudo : authenticatedUser.get("pseudo"),
                                        isAdmin : authenticatedUser.get("isAdmin"),
                                        firstName : authenticatedUser.get("firstName"),
                                        lastName : authenticatedUser.get("lastName")

                                    }

                                });
                            }

                        });

                    } else { //notFound
                        res.json({error : "User not found"});
                    }


                },
                error : function (err) {
                    //TODO ...
                    res.json({error : "Houston ... We've got a problem :("});
                    //res.json({error : err});
                }
            });

        } else {
            res.json({error : "Type Pseudo & Password"});
        }


    }

});
