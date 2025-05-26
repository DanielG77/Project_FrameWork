function protecturl() {
	console.log("Checking user session...");
	$.ajax({
		type : 'POST',
		url  : friendlyURL("?module=auth&op=controluser"),
		data :  {token: localStorage.getItem('token')}
	})
	.done(function(data){
		console.log("Session checked");
		console.log(data);
		if (data == "match"){
			console.log(data);
		}else if (data == "not_match"){
			Swal.fire({
				icon: 'error',
				title: 'Debes realizar login',
				showConfirmButton: false,
				timer: 2000
			});
			setTimeout(function(){logout()}, 2000);
		}
	})
	.fail( function(response){
		console.log(response)	
	});
}

function protect_activity() {
	console.log("protect_activity() has been called"); // Log llegada de la función
	setInterval(function(){
		console.log("Sending AJAX request for session activity..."); // Log antes del AJAX
		$.ajax({
			type : 'POST',
			url  : friendlyURL("?module=auth&op=activity"),
			success :  function(response){
				console.log("Respuesta del Activity:", response); // Log para el resultado del AJAX
				if(response == "inactivo"){
					Swal.fire({
						icon: 'error',
						title: 'Tiempo agotado',
						text: 'Por favor inicie sesión de nuevo',
						showConfirmButton: false,
						timer: 2000
					});
					setTimeout(function(){logout()}, 2000);
				}
			}
		});
	}, 600000);
	// 60000 para comprobar cada minuto
}

function token_expires() {
    setInterval(function(){
        console.log('[token_expires] Interval fired at:', new Date().toLocaleTimeString());
        if(localStorage.getItem('token') == null){
            console.log('[token_expires] Not registred: No token in localStorage');
        } else {
            console.log('[token_expires] Token found:', localStorage.getItem('token'));
            $.ajax({
                type : 'POST',
                url  : friendlyURL("?module=auth&op=token_expires"),
                data :  {token: localStorage.getItem('token')}
            })
            .done(function(data){
                console.log('[token_expires] AJAX response:', data);
                if (data == "activo"){
                    console.log('[token_expires] Token is active');
                }else if (data == "inactivo"){
                    console.log('[token_expires] Token is inactive, logging out...');
                    toastr.options.timeOut = 2000;
                    toastr.error("Tiempo agotado, porfavor inicie sesión de nuevo");
                    setInterval(function(){logout()}, 2000);
                }                   
            })
            .fail( function(response){
                console.log('[token_expires] AJAX error:', response);
            });
        }
    }, 600000); // 60000 ms = 1 minuto
}

function refresh_session() {
	setInterval(function(){
		$.ajax({
			type : 'POST',
			url  : friendlyURL("?module=auth&op=refresh_cookie"),
		}).done(function(data){			
			console.log("$Session updated");
		})
		.fail( function(response){
			console.log(response);	
		});
	}, 600000);
}

function refresh_token() {
    setInterval(function(){
        console.log('[refresh_token] Interval fired at:', new Date().toLocaleTimeString());
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('[refresh_token] No token found in localStorage. Skipping refresh.');
            return;
        }
        console.log('[refresh_token] Current token:', token);
        $.ajax({
            type : 'POST',
            url  : friendlyURL("?module=auth&op=refresh_token"),
            data :  {token: token}
        }).done(function(data){
            console.log('[refresh_token] AJAX response:', data);
            localStorage.setItem("token", data);
            console.log('[refresh_token] Token updated in localStorage.');
        })
        .fail( function(response){
            console.log('[refresh_token] AJAX error:', response);
        });
    }, 600000);
}

$(document).ready(function(){
	protect_activity();
	token_expires();
	refresh_token();
	refresh_session();
	protecturl();
});
