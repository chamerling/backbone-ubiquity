Backbone.Kind = function() {};
Backbone.Kind.extend = Backbone.Model.extend;

Parts = window.Parts = {};

Backbone.Part = Backbone.Kind.extend({},{ //Static
    load : function (url_from, selector_where, callback) {
        $.ajax({type:"GET", url:url_from,
            error:function(err){ console.log(err); },
            success:function(dataFromServer) {
                $(selector_where).html(dataFromServer);
                callback();
            }
        })
    }
});