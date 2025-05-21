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

/* Loading Spinner */
// function loading_spinner() {
//     window.onload = function(){
//         var contenedor = document.getElementById('contenedor_carga');

//         contenedor.style.visibility = "hidden";
//         contenedor.style.opacity = '0';
//     }
// }

/* LOAD MENU */
function load_menu() {
    // console.log("hola load menu");
    const token = localStorage.getItem('token');

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
    
    if (token) {
        ajaxPromise(friendlyURL('?module=auth&op=user'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                console.log(data);
                if (data.type_user == "Client") {
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

// /* MENUS */
// function menu_admin() {
//     $('<li></li>').attr('class', 'profile').attr('id', 'profile').html('<a id="profile" class="nav_link" data-tr="Profile">Profile</a>').appendTo('.nav_list');
// }

// function menu_client() {
//     $('<li></li>').attr('class', 'profile').attr('id', 'profile').html('<a id="profile" class="nav_link" data-tr="Profile">Profile</a>').appendTo('.nav_list');
// }

// /* CLICK PROFILE */
// function click_profile(data) {
//     $(document).on('click', '#profile', function() {
//         $(".profile_options").remove();
//         $('<div></div>').attr('class', 'profile_options').attr('id', 'profile_options').appendTo('.nav_list_profile')
//         .html(
//             "<ul class='profile_list' id='profile_list'>" +
//                 "<li><div class='user'>" +
//                 "<div class='user_img'><img class='avatar_img' src='" + data.avatar + "'></div>" + 
//                 "<div class='user_name'>" + data.username + "</div></li>" +
//                 "<li><div id='logout' class='logout' data-tr='Log out'>Log out</div></li>" +
//             "</ul>"
//         )
//     });
//     $(document).on('click scroll', function(event) {
//         if (event.target.id !== 'profile') {
//             $('.profile_options').fadeOut(500);
//         }
//     });
// }


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

$(document).ready(function() {
    load_menu();
    click_logout();
    // loading_spinner();
});