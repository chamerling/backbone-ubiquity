function loadSample() {
    $.ajax({type:"GET", url:"/sample.html",
        error:function(err){ console.log(err); },
        success:function(dataFromServer) {
            $('#sample').html(dataFromServer);

            App.load();

        }
    })
}

App = {

    views : {},

    load : function () {

        /*
            SOCKETS
         */
        /*var that = this;
        this.socket_message = $("#socket_message");
        this.socket = io.connect("http://localhost:8000");

        this.socket.on("message", function(data) {

            that.socket_message.html(data.firstName + " " + data.lastName);
        });*/


        this.views.HumansList = Backbone.View.extend({
            el : $("#humans_list"),
            initialize : function () {
                this.template = $("#humans_list_tpl").html();
            },
            render : function () {
                var renderedContent = Mustache.to_html(this.template, {humans : this.collection.toJSON()} );
                this.$el.html(renderedContent);

                //this.el.html(renderedContent);
                //$("#humans_list").html(renderedContent);
            }
        });

        this.views.HumanForm = Backbone.View.extend({
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

        window.humansList = new App.views.HumansList({collection:humans});

        window.humanForm = new App.views.HumanForm({collection:humans, linkedView:humansList});

        humanForm.render();

        humans.fetch({success: function(data){
            humansList.render();
        }});






    }
}


