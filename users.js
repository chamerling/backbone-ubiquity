function loadUsers() {
    $.ajax({type:"GET", url:"/users.html",
        error:function(err){ console.log(err); },
        success:function(dataFromServer) {
            $('#users').html(dataFromServer);

            Admin.load();

        }
    })
}

Admin = {

    views : {},

    load : function () {

        this.views.UsersList = Backbone.View.extend({
            el : $("#users_list"),
            initialize : function () {
                this.template = $("#users_list_tpl").html();
            },
            render : function () {
                var renderedContent = Mustache.to_html(this.template, {users : this.collection.toJSON()} );

                this.$el.html(renderedContent);
            }
        });

        this.views.UserForm = Backbone.View.extend({
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

                console.log(tmpUser);

                tmpUser.save({},{success:function(data){

                    if(!data.get("id")) {

                        that.render(tmpUser.get("pseudo")+ " -> " + data.get("message"));
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

        window.usersList = new Admin.views.UsersList({collection:users});

        window.userForm = new Admin.views.UserForm({collection:users, linkedView:usersList});

        userForm.render();

        users.fetch({success: function(data){
            console.log(data);
            usersList.render();
        }});

        console.log("User Admin loaded ...");

    }
}


