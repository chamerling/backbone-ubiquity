function welcome() {

    var mdConverter = new Showdown.converter();

    $.ajax({type:"GET", url:"/spa.parts/welcome.html",
        error:function(err){ console.log(err); },
        success:function(dataFromServer) { 
        	$('#welcome').html(dataFromServer);

        	//activate tabs
			$('#mytab a').click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			})

			$.ajax({type:"GET", url:"/README.md",
				error:function(err){ console.log(err); },
				success:function(dataFromServer) { 
					$('#prez').html(mdConverter.makeHtml(dataFromServer));
				}
			})
			$.ajax({type:"GET", url:"/README.FR.md",
				error:function(err){ console.log(err); },
				success:function(dataFromServer) { 
					$('#prezfr').html(mdConverter.makeHtml(dataFromServer));
				}
			})

            loadSample();
            loadUsers();

			console.log("WELCOME TO BACKBONE-UBIQUITY ...");

        }
    })






    




}