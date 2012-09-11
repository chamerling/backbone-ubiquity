function loadLogin() {
    Parts.Login.load("/spa.parts/users/login.html", '#login', function() {Parts.Login.start()});
}

Parts.Login = Backbone.Part.extend({},{ //Static
    views : {},

    start : function () {

        Parts.Login.views.LoginForm = Backbone.View.extend({
            el : $("#login_form"),

            initialize : function () {
                var that = this;
                this.template = $("#login_form_tpl").html();

                //Already authenticated ? TODO:
                that.render("Please, connect yourself ",{firstName:"John", lastName:"Doe"});
                /*
                $.ajax({type:"GET", url:"/alreadyauthenticated",
                    error:function(err){ console.log(err); },
                    success:function(dataFromServer) {
                        console.log(dataFromServer);
                        if(dataFromServer.firstName) {
                            that.render("Bienvenue",dataFromServer);
                        } else {
                            that.render("???",{firstName:"John", lastName:"Doe"});
                        }
                    }
                })*/

            },
            render : function (message, user) {
                var renderedContent = Mustache.to_html(this.template, {
                    message : message,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    pseudo : user.pseudo
                });
                this.$el.html(renderedContent);
            },
            events : {
                "click  .btn-primary"  : "onClickBtnLogin",
                "click  .btn-inverse"  : "onClickBtnLogoff"
            },
            onClickBtnLogin : function (domEvent) {
                //console.log($(domEvent.srcElement).text());
                var fields = $("#login_form :input")
                    ,   that = this;
                console.log(fields[0].value, fields[1].value);

                ///users/login/:login'

                $.ajax({
                    type:"POST",
                    url:"/users/login",
                    data : { pseudo : fields[0].value, password : fields[1].value } ,
                    dataType : 'json',
                    error:function(err){
                        console.log(err);
                        that.render(dataFromServer.error,'');
                    },
                    success:function(dataFromServer) {

                        console.log("response (authentication) : ",dataFromServer);

                        if(dataFromServer.user) {
                            that.render("Bienvenue",dataFromServer.user);
                        } else {
                            that.render(dataFromServer.error,'');
                        }


                    }
                });
            },
            onClickBtnLogoff : function() {
                console.log("LOGOFF");
                var that = this;

                /*
                $.ajax({type:"GET", url:"/logoff",
                    error:function(err){ console.log(err); },
                    success:function(dataFromServer) {
                        console.log(dataFromServer);
                        that.render("???",{firstName:"John", lastName:"Doe"});
                    }
                })*/
            }

        });
        window.loginView = new Parts.Login.views.LoginForm();
        //loginView.render();

        console.log("Login Form loaded ...");

    }
});



