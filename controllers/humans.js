
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
                //TODO ...
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
                //TODO ...
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
                //TODO ...
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
                //TODO ...
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
                //TODO ...
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
                //TODO ...
                res.json(err);
            }
        });
    }

});
