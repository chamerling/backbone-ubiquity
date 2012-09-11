function loadSample() {
    Parts.App.load("/spa.parts/sample.html", '#sample', function() {Parts.App.start()});
}

Parts.App = Backbone.Part.extend({},{ //Static

    views : {},
    start : function () {
        /*
         SOCKETS
         */


       /*
        Parts.App.socket_message = $("#socket_message");
        Parts.App.socket = io.connect("http://localhost:8000");
        Parts.App.socket.on("message", function(data) {
            Parts.App.socket_message.html(data.firstName + " " + data.lastName);
        });
        */

        Parts.App.views.HumansList = Backbone.View.extend({
            el : $("#humans_list"),
            initialize : function () {
                this.template = $("#humans_list_tpl").html();
            },
            render : function () {
                var renderedContent = Mustache.to_html(this.template, {humans : this.collection.toJSON()} );
                this.$el.html(renderedContent);

                //this.el.html(renderedContent);
                //$("#humans_list").html(renderedContent);
            },
            events : {
                "click .select-human" : "onSelectHuman",
                "click .delete-human" : "onDeleteHuman"
            },
            onSelectHuman : function(domEvent) {
                console.log("Selected : ", $(domEvent.currentTarget).attr("data-human-id"));
            }
            ,
            onDeleteHuman : function(domEvent) {
                console.log("To delete : ", $(domEvent.currentTarget).attr("data-human-id"));
                var id_to_delete = $(domEvent.currentTarget).attr("data-human-id");

                var tmp = new Models.Human({id : id_to_delete});

                var that = this;

                tmp.destroy({
                    error : function() {
                        //TODO: ...
                    },
                    success : function(data) {
                        console.log("Human Model destroyed : ", data);
                        that.collection.fetch({
                            success:function() {
                                $("#human_message").html(data.get("id") + " has been removed.");
                                that.render();

                            }
                        });


                    }
                });


            }
        });

        Parts.App.views.HumanForm = Backbone.View.extend({
            el : $("#human_form"),

            initialize: function(args) {
                this.template = $("#human_form_tpl").html();
                this.collection = args.collection;
                this.linkedView = args.linkedView;
            },
            render : function (message) {
                message ? message : "...";
                var renderedContent = Mustache.to_html(this.template, {message: message} );
                this.$el.html(renderedContent);
            },
            events : {
                "click  .btn-primary"  : "onClickBtnAdd"
            },
            onClickBtnAdd : function() {
                var fields = $("#human_form :input")
                    ,   that = this
                    ,   tmpHuman = new Models.Human({firstName:fields[0].value, lastName:fields[1].value});

                tmpHuman.save({},{success:function(){
                    that.render(fields[0].value + " " + fields[1].value + " has been added.");
                    that.collection.fetch({success: function(data){
                        that.linkedView.render();
                    }});
                }});

            }
        });

        console.log("html code of sample is loaded");

        window.humans = new Models.Humans();

        window.humansList = new Parts.App.views.HumansList({collection:humans});

        window.humanForm = new Parts.App.views.HumanForm({collection:humans, linkedView:humansList});

        humanForm.render();

        humans.fetch({success: function(data){
            humansList.render();
        }});
    }

});


