
Controllers.Users = Backbone.Controller.extend({},{ //Static
    //TODO: verifier unicité du pseudo
    create:function(req, res) {
        var johndoe = new Models.User(req.body)
        ,   users = new Models.Users();

        users.mongoQuery = {pseudo : johndoe.get("pseudo") };

        users.fetch({
            success : function(models) {

                if(models.length>0) {
                    //Already exists
                    console.log("Already exists : ", models[0]);

                    res.json({message: "Already exists"});

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
                        res.json({message: "You need a Pseudo and a password"});
                    }

                }

            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });




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
        var johndoe = new Models.User({id:req.params.id});

        johndoe.destroy({
            success : function(model) {
                res.json(model);
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });
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
    getAuthenticatedUser : function (req, res) {
        var login = req.params.login
            ,   users = new Models.Users();

        users.mongoQuery = {pseudo : login.pseudo, password : login.password };

        users.fetch({
            success : function(models) {
                console.log(models[0]);
                res.json(models[0]); //first
            },
            error : function (err) {
                //TODO ...
                res.json(err);
            }
        });
    }

});
