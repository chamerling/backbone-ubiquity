function loadUsers() {
    Parts.Admin.load("/spa.parts/users/users.html", '#users', function() {Parts.Admin.start()});
}

Parts.Admin = Backbone.Part.extend({},{ //Static
    views : {},

    start : function () {

        /*
            SOCKETS
         */
        /*
        Parts.Admin.socket_message = $("#socket_message_user");
        Parts.Admin.socket = io.connect("http://localhost:8000");
        Parts.Admin.socket.on("message_user", function(data) {
            Parts.Admin.socket_message.html(data.pseudo+ " "+ data.email+ " "+ data.firstName + " " + data.lastName);
        });
        */

        Parts.Admin.views.UsersList = Backbone.View.extend({
            el : $("#users_list"),
            initialize : function () {
                this.template = $("#users_list_tpl").html();
            },
            render : function () {

                console.log("UsersList render() : ", this.collection);

                var renderedContent = Mustache.to_html(this.template, {users : this.collection.toJSON()} );

                this.$el.html(renderedContent);
            },
            events : {
                "click .select-user" : "onSelectUser",
                "click .delete-user" : "onDeleteUser"
            },
            onSelectUser : function(domEvent) {
                console.log("Selected : ", $(domEvent.currentTarget).attr("data-user-id"));
                var tmp = new Models.User({id : $(domEvent.currentTarget).attr("data-user-id")});

                tmp.fetch({
                    success : function(model, infos) {
                        console.log("SELECTED : ", model, infos);
                        if(infos.error){
                            $("#user_message").attr("class", "alert alert-error");
                            $("#user_message").html(infos.error);
                        } else {
                            $("#user_message").attr("class", "alert alert-info");
                            $("#user_message").html(model.get("pseudo")+ " is selected ...");

                        }
                    },
                    error : function (err) {console.log("SELECTED ERROR : ", err); }
                });
            }
            ,
            onDeleteUser : function(domEvent) {
                console.log("To delete : ", $(domEvent.currentTarget).attr("data-user-id"));
                var id_to_delete = $(domEvent.currentTarget).attr("data-user-id");

                var tmp = new Models.User({id : id_to_delete});

                var that = this;

                tmp.destroy({
                    error : function() {
                        //TODO: ...
                    },
                    success : function(model, infos) {

                        console.log("User Model destroyed called --> : ", model, infos);


                        if(infos.error) {
                            $("#user_message").attr("class", "alert alert-error");
                            $("#user_message").html(infos.error);

                        } else {
                            that.collection.fetch({
                                success:function() {
                                    $("#user_message").attr("class", "alert alert-info");
                                    $("#user_message").html(model.get("id") + " has been removed.");
                                    that.render();

                                }
                            });

                        }





                    }
                });


            }
        });

        Parts.Admin.views.UserForm = Backbone.View.extend({
            el : $("#user_form"),

            initialize: function(args) {
                this.template = $("#user_form_tpl").html();
                this.collection = args.collection;
                this.linkedView = args.linkedView;
            },
            render : function (message) {
                message ? message : "...";
                var renderedContent = Mustache.to_html(this.template, {message: message} );
                this.$el.html(renderedContent);
            },
            events : {
                "click  #btnAddUser"  : "onClickBtnAdd"
            },
            onClickBtnAdd : function() {
                var fields = $("#user_form :input")
                    ,   that = this
                    ,   tmpUser = new Models.User({
                        pseudo:fields[0].value,
                        password:fields[1].value,
                        email:fields[2].value,
                        firstName:fields[3].value,
                        lastName:fields[4].value,
                        isAdmin:fields[5].checked
                    });

                //console.log(tmpUser);

                tmpUser.save({},{success:function(data, infos){
                    console.log("ADD USER : ", data, infos);


                    if(infos.error ) {

                        that.render(tmpUser.get("pseudo")+ " -> " + infos.error);
                        $("#user_message").attr("class", "alert alert-error");
                    } else {

                        that.render(tmpUser.get("pseudo") + " has been added.");
                        $("#user_message").attr("class", "alert alert-success");
                        that.collection.fetch({success: function(data){
                            that.linkedView.render();
                        }});
                    }



                }});

            }
        });

        window.users = new Models.Users();

        window.usersList = new Parts.Admin.views.UsersList({collection:users});

        window.userForm = new Parts.Admin.views.UserForm({collection:users, linkedView:usersList});

        userForm.render();

        users.fetch({success: function(data){
            console.log(data);
            usersList.render();
        }});

        console.log("User Admin loaded ...");

    }
});



