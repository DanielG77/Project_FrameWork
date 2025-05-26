/* AJAX PROMISE */
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    
    console.log('ajaxPromise - URL:', sUrl);
    console.log('ajaxPromise - Type:', sType);
    console.log('ajaxPromise - DataType:', sTData);
    console.log('ajaxPromise - Data:', sData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        })
            .done((data) => {
                console.log('ajaxPromise - Response data:', data);
                resolve(data);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.error('ajaxPromise - Error:', errorThrown);
                reject(errorThrown);
            });
    });
}

/* FRIENDLY URL */
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link += "/" + aux[1] + "/";	
        }else{
        	link += "/" + aux[1];
        }
    }
    return "/programas/Project_FrameWork" + link;
}

/* LOAD MENU */
function load_menu() {
    // console.log("hola load menu");
    const token = localStorage.getItem('token');
    // console.log(token);

    // Logo
  $('<a></a>')
    .attr({ 'class': 'enlaze', 'id': 'enlaze', 'href': friendlyURL("?module=home&op=view") })
    .appendTo('#icono');
    
    //Marca
    $('<a></a>')
        .attr({ 'class': 'navbar-brand', 'id': 'navbar-brand', 'href': friendlyURL("?module=home&op=view") })
        .text('La Taberna De los Dados')
        .appendTo('.nav_bar_logitp');

    // "Shop"
    $('<li></li>')
        .attr({ 'class': 'nav-item' })
        .html('<a href="' + friendlyURL("?module=shop&op=view") + '" class="nav-link">Shop</a>')
        .appendTo('.navbar-nav');

    // "Login"
    $('<li></li>')
        .attr({ 'class': 'nav-item', 'id': 'login_link' })
        .html('<a href="' + friendlyURL("?module=auth&op=view") + '" class="nav-link">Log in</a>')
        .appendTo('.navbar-nav');

    // console.log("Data de usuario:", token);
    // console.log(token);
    if (token) {
        ajaxPromise(friendlyURL('?module=auth&op=user'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                // console.log("Data de usuario:", data);
                // console.log(data);
                if (data.type_user == "Client" || data.type_user == "client_social") {
                    console.log("Cliente logeado");
                    // $opcCrud.empty();
                    // $opcExceptions.empty();
                } else {
                    console.log("Admin logeado");
                    // $opcCrud.show();
                    // $opcExceptions.show();
                }

                // Oculta el enlace de login
                $('#login_link').hide();
                // Elimina cualquier menú de usuario previo
                $('.navbar-nav .user-menu').remove();
                // Crea el menú de usuario con avatar, nombre y logout en línea
                const $userMenu = $('<li>', { class: 'nav-item user-menu d-flex align-items-center', style: 'gap: 8px;' });
                $userMenu.html(`
                    <img src="${data.avatar}" alt="Avatar" class="avatar-img me-2" style="width:32px;height:32px;border-radius:50%;object-fit:cover;">
                    <span style="font-weight:500;">${data.username}</span>
                    <a href="#" class="logout-btn" style="color:inherit; margin-left:8px; font-size:1.2em;" title="Logout"><i class="fa-solid fa-right-from-bracket"></i></a>
                `);
                $('.navbar-nav.ms-auto').append($userMenu);

                // Evento logout
                $(document).on('click', '.logout-btn', function(e) {
                    e.preventDefault();
                    logout();
                });

            }).catch(function(error) {
                console.error("Error cargando datos:", error);
                // handleLogoutUI();
            });
        }
}


/* CLICK LOGOUT */
function click_logout() {
    $(document).on('click', '#logout', function() {
        logout();
        setTimeout(1000, window.location.href = friendlyURL("?module=home&op=view"));
    });
}

/* LOGOUT */
function logout() {
    ajaxPromise(friendlyURL('?module=auth&op=logout'), 'POST', 'JSON')
    .then(function(data) {
        console.log(data);
        localStorage.removeItem('token');
        window.location.href = friendlyURL("?module=home&op=view");
        console.log("Sesion cerrada");
    })
    .catch(function() {
        console.log("Error: Logout error");
    });
}


function load_content() {
    let path = window.location.pathname.split('/');
    
    if(path[5] === 'recover'){
        window.location.href = friendlyURL("?module=auth&op=recover_view");
        localStorage.setItem("token_email", path[6]);
    }else if (path[5] === 'verify') {
        ajaxPromise(friendlyURL("?module=auth&op=verify_email"), 'POST', 'JSON', {token_email: path[6]})
        .then(function(data) {
            toastr.options.timeOut = 3000;
            toastr.success('Email verified');
        window.location.href = friendlyURL("?module=auth&op=view");
        })
        .catch(function() {
          console.log('Error: verify email error');
        });
    }else if (path[4] === 'view') {
        $(".login-wrap").show();
        $(".forget_html").hide();
    }else if (path[4] === 'recover_view') {
        load_form_new_password();
    }
}

$(document).ready(function() {
    load_menu();
    click_logout();
    load_content();
});