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

//================HEADER================
function load_menu() {
    const token = localStorage.getItem('token');
    const $userMenu = $('#user_menu');
    const $loginLink = $('#login_link');
    const $opcCrud = $('.opc_CRUD');
    const $opcExceptions = $('.opc_exceptions');

    if (token) {
        ajaxPromise('/programas/courses_home/module/auth/controller/ctrl_auth.php?op=data_user', 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                console.log(data);
                if (data.type_user == "Client") {
                    console.log("Cliente logeado");
                    $opcCrud.empty();
                    $opcExceptions.empty();
                } else {
                    console.log("Admin logeado");
                    $opcCrud.show();
                    $opcExceptions.show();
                }

                $loginLink.hide();
                $userMenu.show();
                
                $('.log-icon').empty().append(
                    $('<img>').attr({ 
                        src: data.avatar,
                        alt: "Avatar",
                        class: "avatar-img"
                    })
                );

                $('#des_inf_user').html(`
                    <a>${data.username}</a>
                    <a id="logout" style="cursor: pointer;">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </a>
                `);

            }).catch(function(error) {
                console.error("Error cargando datos:", error);
                handleLogoutUI();
            });
    } else {
        console.log("No hay sesión activa");
        handleLogoutUI();
    }

    function handleLogoutUI() {
        $loginLink.show();
        $userMenu.hide();
        $opcCrud.empty();
        $opcExceptions.empty();
        $('.log-icon').html(
            '<a href="index.php?module=ctrl_login&op=login-register_view">' +
            '<i id="col-ico" class="fa-solid fa-user fa-2xl"></i></a>'
        );
        $('#des_inf_user').empty();
    }
}


//================CLICK-LOGOUT================
function click_logout() {
    $(document).on('click', '#logout', function() {
        localStorage.removeItem('token');
        Swal.fire({
            title: 'Sesión cerrada',
            html: '<span style="color:#5a1a1a">¡Vuelve pronto!</span>',
            iconHtml: '<i class="fa-solid fa-right-from-bracket fa-2xl" style="color:#9b1c1c"></i>',
            showConfirmButton: true,
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#9b1c1c',
            background: '#fff3f3',
            position: 'center',
            showClass: {
                popup: 'animate__animated animate__zoomIn animate__faster'
            }
        });
        setTimeout('logout(); ', 1000);
        window.location.reload;
    });
}

//================LOG-OUT================
function logout() {
    ajaxPromise('/programas/courses_home/module/auth/controller/ctrl_auth.php?op=logout', 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('token');
            window.location.href = "index.php?module=ctrl_home&op=list";
        }).catch(function() {
            console.log('Algo a Ocurrido');
        });
}

// // Remove localstorage('page') with click in shop
function click_shop() {
    $(document).on('click', '#opc_shop', function() {
        localStorage.removeItem('page');
        localStorage.removeItem('total_prod');
    });
}

$(document).ready(function() {
    load_menu();
    click_logout();
    click_shop();
});