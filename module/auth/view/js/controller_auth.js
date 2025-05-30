function authy() {
    var location_auth = localStorage.getItem('location_auth') || false;
    
    if (location_auth === 'SingIn') {
        authyread('SingIn');
    } else if (location_auth === 'recover') {
        authyread('recover');
    } else {
        authyread('SingUp');
    }
}

function authyread(authy) {
    $('#grid_align__item').empty();
    if(authy == 'SingIn'){
        $('<div></div>')
            .addClass("login")
            .appendTo('#grid_align__item')
            .html(
                
                "<div class='container px-5'><div id='icono'></div><ul class='nav_bar_logitp'></ul>" +
                "<h2>Sign In</h2>" +
                "<form method='post' class='formulito' id='formulito'>" +
                    "<div class='form__field'>" +
                        "<input type='username'  id='user_email' placeholder='user or email'>" +
                        "<span id='error_usema_log' class='error'></span>" +
                    "</div>" +  
                    "<div class='form__field'>" +
                        "<input type='password'  id='passwordlog' placeholder='••••••••••••'>" + 
                        "<span id='error_fpass_log' class='error'></span>" +
                    "</div>" +
                    "<div class='form__field'>" +
                        "<input type='submit' class='login' id='login' value='Sign In'>" +
                    "</div>" +
                    // Botones de login social
                    "<div class='form__field social-login'>" +
                        "<button type='button' class='btn-social-login' id='login-email'><i class='fa fa-envelope'></i> Acceder con Email</button>" +
                        "<button type='button' class='btn-social-login' id='login-github'><i class='fab fa-github'></i> Acceder con GitHub</button>" +
                    "</div>" +
                    "<div class='form__field'>" +
                        "<p>¿Ya tienes una cuenta? <button class='login-link' id='login-link'>Sign In</button></p>" +
                    "</div>" +
                    "<div class='form__field'>" +
                        "<p>¿Ya tienes una cuenta? <button class='test' id='test'>test</button></p>" +
                    "</div>" +
                    "<div class='form__field forgot-pass-field'>" +
                        "<a href='#' class='forgot-password-link' id='forgot-password-link'>¿Has olvidado tu contraseña?</a>" +
                    "</div>" +
                "</form>" +

                "</div>"
            );

        }else if(authy == 'recover') {
        // NUEVO: formulario de recuperación de contraseña
        $('<div></div>')
            .addClass("recover-password")
            .appendTo('#grid_align__item')
            .html(
                "<div class='container px-5'><div id='icono'></div><ul class='nav_bar_logitp'></ul>" +
                "<h2>Recuperar Contraseña</h2>" +
                "<form method='post' class='formulito' id='recover_email_form'>" +
                    "<div class='form__field'>" +
                        "<input type='email' id='recover_email' name='recover_email' placeholder='Introduce tu correo'>" +
                        "<span id='error_email_forg' class='error'></span>" +
                    "</div>" +
                    "<div class='form__field'>" +
                        "<input type='submit' class='send_recover' id='send_recover' value='Enviar enlace de recuperación'>" +
                    "</div>" +
                    "<div class='form__field'>" +
                        "<p><button class='back-to-login' id='back-to-login'>← Volver al inicio de sesión</button></p>" +
                    "</div>" +
                "</form>" +
                "</div>"
            );
    }else{
        $('<div></div>')
            .addClass("register")
            .appendTo('#grid_align__item')
            .html(
                
                "<div class='container px-5'><div id='icono'></div><ul class='nav_bar_logitp'></ul>" +
                "<h2>Sign Up</h2>" +
                "<form method='post' class='formulito' id='formulito'>" +
                    "<div class='form__field'>" +
                        "<input type='email' id='email' placeholder='info@mailaddress.com'>" +
                        "<span id='error_email_log' class='error'></span>" +
                    "</div>" +
                    "<div class='form__fiel'>" +
                        "<input type='username'  id='username' placeholder='username'>" +
                        "<span id='error_usern_log' class='error'></span>" +
                    "</div>" +  
                    "<div class='form__field'>" +
                        "<input type='password'  id='firstpassword' placeholder='••••••••••••'>" + 
                        "<span id='error_fpass_log' class='error'></span>" +
                    "</div>" +
                    "<div class='form__field'>" +
                        "<input type='password'  id='secondpassword' placeholder='••••••••••••'>" +
                        "<span id='error_spass_log' class='error'></span>" +
                    "</div>" +

                    "<div class='form__field'>" +
                        "<input type='submit'class='register' id='register' value='Sign Up'>" +
                    "</div>" +
                    // Botones de registro social
                    "<div class='form__field social-login'>" +
                        "<button type='button' class='btn-social-login' id='login-email'><i class='fa fa-envelope'></i> Acceder con Email</button>" +
                        "<button type='button' class='btn-social-login' id='login-github'><i class='fab fa-github'></i> Acceder con GitHub</button>" +
                    "</div>" +
                    "<div class='form__field'>" +
                        "<p>¿Ya tienes una cuenta? <button class='register-link' id='register-link'>Sign Up</button></p>" +
                    "</div>" +

                "</form>" +

                "</div>"
            );
        }
}

function signup() {
    // console.log(validateSignUp()); PARA CREAR UNA CUENTA

    if (validateSignUp() != true) {
        email = ($('#email').val());
        username = ($('#username').val());
        passworda = ($('#firstpassword').val());
        passwordo = ($('#secondpassword').val());
        // console.log(email);

        ajaxPromise(friendlyURL('?module=auth&op=register'), 'POST', 'JSON', { 'email': email, 'username': username, 'passworda': passworda })
            .then(function(result) {
                // console.log(result);
                if (result == "email_exist") {
                    document.getElementById('error_email_log').innerHTML = "El email ya esta en uso, asegurate de no tener ya una cuenta"
                } else if (result == "username_exist") {
                    document.getElementById('error_usern_log').innerHTML = "El usuario ya esta en uso, intentalo con otro"
                } else if (result == "ok") {
                    Swal.fire({
                        title: '¡Registro exitoso!',
                        text: 'Tu cuenta ha sido creada correctamente.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                    localStorage.setItem('location_auth', "SingIn");
                    window.location.reload();           
            }
            });
    }
}

function signin() {
    // console.log(validateSignUp()); PARA Iniciar Session
    if (validateSignIn() != true) {
        username_log = ($('#user_email').val());
        password_log = ($('#passwordlog').val());
        
        ajaxPromise(friendlyURL('?module=auth&op=login'), 'POST', 'JSON', { 'username_log': username_log, 'password_log': password_log })
            .then(function(result) {
                // console.log(result);
                    if (result == "error_user") {
                        document.getElementById('error_usema_log').innerHTML = "El usario no existe,asegurase de que lo a escrito correctamente"
                    } 
                    else if (result == "error_passwd") {
                        document.getElementById('error_fpass_log').innerHTML = "La contraseña es incorrecta"
                        if( localStorage.getItem('cont_error') == null){
                            localStorage.setItem('cont_error', 1);
                        }else{
                            localStorage.setItem('cont_error', parseInt(localStorage.getItem('cont_error')) + 1);
                        }
                        if( localStorage.getItem('cont_error') >= 3){
                            console.log("Usuario bloqueado");
                            ajaxPromise(friendlyURL('?module=auth&op=user_state'), 'POST', 'JSON', { 'username_log': username_log, 'is_blocking': true })
                            .then(function(result) {
                                ajaxPromise(friendlyURL('?module=auth&op=data_token_banned'), 'POST', 'JSON', { 'username_log': username_log })
                                .then(function(token) {
                                send_message_telegram(token[0].token_banned);
                                localStorage.setItem('username_banned', username_log);
                                window.location.href = friendlyURL("?module=auth&op=recover_acount");
                                });
                            });

                        }

                     } else {
                        // Comprobación de usuario activo
                        if (result == "user_inactivo") {
                            // Usuario NO activo
                            Swal.fire({
                                title: 'Usuario no activo',
                                text: 'Tu usuario no está activo. Por favor, revisa tu correo para activarlo.',
                                icon: 'warning',
                                confirmButtonText: 'OK'
                            });
                            return;
                        }

                        if (result == "user_banned") {
                        //     // Usuario NO activo
                            // Swal.fire({
                            //     title: 'Usuario banneado',
                            //     text: 'Tu usuario está banneado. Por favor, revisa tu telegram.',
                            //     icon: 'warning',
                            //     confirmButtonText: 'OK'
                            // });

                                ajaxPromise(friendlyURL('?module=auth&op=data_token_banned'), 'POST', 'JSON', { 'username_log': username_log })
                                .then(function(token) {
                                send_message_telegram(token[0].token_banned);
                                localStorage.setItem('username_banned', username_log);
                                window.location.href = friendlyURL("?module=auth&op=recover_acount");
                                });

                            return;
                        }
                        // Usuario activo: flujo normal
                        localStorage.setItem("token", result.token ? result.token : result);
                        Swal.fire({
                            title: 'Loggin con Exito',
                            text: 'Bienvenido de nuevo usuario.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });

                        setTimeout(function() {
                            const shopUbication = localStorage.getItem('shop_ubication');
                            if (shopUbication !== null) {
                                // Si 'shop_ubication' existe en localStorage, recarga la página
                            window.location.href = friendlyURL("?module=shop&op=view");
                            } else {
                                window.location.href = friendlyURL("?module=home&op=view");
                            }
                        }, 1000);
                    }
        });
    }
        
}

function validateSignUp() {
    //Para crear una cuenta
    var email = document.getElementById('email').value;
    // localStorage.setItem('yes', email)

    var username = document.getElementById('username').value;
    // localStorage.setItem('si', username)

    var firstPassword = document.getElementById('firstpassword').value;
    // localStorage.setItem('firstPassword', firstPassword)

    var secondPassword = document.getElementById('secondpassword').value;
    // localStorage.setItem('secondPassword', secondPassword)

    var error = false;
    // console.log(error);
    if (email.length === 0) {
        document.getElementById('error_email_log').innerHTML = "You must enter an email";
        error = true;
    } else {
        document.getElementById('error_email_log').innerHTML = "";
    }

    if (username.length === 0) {
        document.getElementById('error_usern_log').innerHTML = "You must enter a username";
        error = true;
    } else if (username.length < 5) {
        document.getElementById('error_usern_log').innerHTML = "The username must be at least 5 characters long";
        error = true;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        document.getElementById('error_usern_log').innerHTML = "No special characters allowed in the username";
        error = true;
    } else {
        document.getElementById('error_usern_log').innerHTML = "";
    }

    if (firstPassword.length === 0) {
        document.getElementById('error_fpass_log').innerHTML = "You must enter a password";
        error = true;
    } else if (firstPassword.length < 5) {
        document.getElementById('error_fpass_log').innerHTML = "The password must be at least 5 characters long";
        error = true;
    } else {
        document.getElementById('error_fpass_log').innerHTML = "";
    }

    if (secondPassword.length === 0) {
        document.getElementById('error_spass_log').innerHTML = "You must confirm the password";
        error = true;
    } else if (secondPassword !== firstPassword) {
        document.getElementById('error_spass_log').innerHTML = "Passwords do not match";
        error = true;
    } else {
        document.getElementById('error_spass_log').innerHTML = "";
    }

    // localStorage.setItem('error_signup_fin', error);

    return error;
}

function validateSignIn() {
    //Para iniciar sesion
    var username = document.getElementById('user_email').value;
    // localStorage.setItem('yes', email)

    var firstPassword = document.getElementById('passwordlog').value;
    // localStorage.setItem('firstPassword', firstPassword)

    var error = false;
    // console.log(error);

    if (username.length === 0) {
        document.getElementById('error_usema_log').innerHTML = "You must enter a username";
        error = true;
    } else if (username.length < 5) {
        document.getElementById('error_usema_log').innerHTML = "The username must be at least 5 characters long";
        error = true;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        document.getElementById('error_usema_log').innerHTML = "No special characters allowed in the username";
        error = true;
    } else {
        document.getElementById('error_usema_log').innerHTML = "";
    }

    if (firstPassword.length === 0) {
        document.getElementById('error_fpass_log').innerHTML = "You must enter a password";
        error = true;
    } else if (firstPassword.length < 5) {
        document.getElementById('error_fpass_log').innerHTML = "The password must be at least 5 characters long";
        error = true;
    } else {
        document.getElementById('error_fpass_log').innerHTML = "";
    }

    return error;
}

function social_login(param){
    authService = firebase_config();
    // console.log(param);
    authService.signInWithPopup(provider_config(param))
    .then(function(result) {
        console.log('Hemos autenticado al usuario ', result.user);
        email_name = result.user.email;
        let username = email_name.split('@');
        console.log(username[0]);

        social_user = {username: username[0], email: result.user.email, avatar: result.user.photoURL};
        if (result) {
            ajaxPromise(friendlyURL("?module=auth&op=social_login"), 'POST', 'JSON', social_user)
            .then(function(data) {
                // console.log(data);
                localStorage.setItem("token", data);
                
                Swal.fire({
                        title: '¡Registro exitoso!',
                        text: 'Has Iniciado Sesion Correctamente.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                setTimeout(function() {
                            window.location.href = friendlyURL("?module=home&op=view");
                        }, 1000);
            })
            .catch(function() {
                console.log('Error: Social login error');
            });
        }
    })
    .catch(function(error) {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);
        var email = error.email;
        console.log(email);
        var credential = error.credential;
        console.log(credential);
    });
}

function firebase_config(){
    // Configuración de Firebase

}

function provider_config(param){
    if(param === 'google'){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        return provider;
    }else if(param === 'github'){
        return provider = new firebase.auth.GithubAuthProvider();
    }
}

function clicks() {
    $('#register').on('click', function(e) {
        e.preventDefault();
        signup();
    });
    //esta al reves este es el loggin
    $('#login').on('click', function(e) {
        e.preventDefault();
        signin();
    });

    $('#test').on('click', function(e) {
        // e.preventDefault();
        signin();
    });

    $('#register-link').on('click', function() {
        localStorage.setItem('location_auth', "SingIn");
        window.location.reload;
    });

    $('#login-link').on('click', function() {
        localStorage.removeItem('location_auth');
        window.location.reload;

    });
  
    $('#login-github').on('click', function() {
        social_login('github');
        // console.log('github');
    });

    $('#login-email').on('click', function() {
        social_login('google');
        // console.log('google');
    }); 
    
    $('#auth_submit').on('click', function(e) {
        e.preventDefault();
        token_input = ($('#auth_token').val());
        // console.log(token_input);
        check_token_banned(token_input);
    }); 

    $('#forgot-password-link').on('click', function(e) {
        e.preventDefault();
        localStorage.setItem('location_auth', "recover");
        window.location.reload();
    });

    // $('#test').on('click', function(e) {
    //     e.preventDefault();
    //     // console.log("Test button clicked");
    //     send_message_telegram("Test message from the login page");

    // });
}

// RECOVER PASSWORD //////////////////////////////////////////////////////////


function click_recover_password(){
    // Captura tecla Enter dentro del input de emai
    $('body').on('submit', '#recover_email_form', function(e) {
    e.preventDefault();
    localStorage.removeItem('location_auth');
    send_recover_password();
});

}

function validate_recover_password() {
    var mail_exp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var email = document.getElementById('recover_email').value;
    var error = false;

    if (!mail_exp.test(email)) {
        document.getElementById('error_email_forg').innerHTML = "El formato del correo es inválido";
        error = true;
    } else {
        document.getElementById('error_email_forg').innerHTML = "";
    }

    return !error; // Devuelve true si no hay errores
}
  
function send_recover_password() {
    if (validate_recover_password() != 0) {
        data = ($('#recover_email').val());

        ajaxPromise(
            friendlyURL('?module=auth&op=send_recover_email'),
            'POST',
            'JSON',
            { "data": data }
        ).then(function(result) {
            if (result === "error") {
                $("#error_email_forg").html("The email doesn't exist");
            } else {
                toastr.options.timeOut = 3000;
                toastr.success("Email sent");
                console.log("Email sent successfully");
                // setTimeout(function() {
                //     window.location.href = friendlyURL("?module=login&op=view");
                // }, 1000);
            }
        }).catch(function(error) {
            console.log('Error: Recover password error', error);
        });    
    }
}

//////////////////////////////////////////////////////////////////////////////
// function load_form_new_password(){
//     token_email = localStorage.getItem('token_email');
//     localStorage.removeItem('token_email');
//     $.ajax({
//         url: friendlyURL('?module=login&op=verify_token'),
//         dataType: 'json',
//         type: "POST",
//         data: {token_email: token_email},
//     }).done(function(data) {
//         if(data == "verify"){
//             click_new_password(token_email); 
//         }else {
//             console.log("error");
//         }
//     }).fail(function( textStatus ) {
//         console.log("Error: Verify token error");
//     });    
// }

function click_new_password(){
    $(".recover_html").keypress(function(e) {
        token_email = localStorage.getItem('token_email');
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
        	e.preventDefault();
            send_new_password(token_email);
        }
        // console.log("hola");

    });

    $('#button_set_pass').on('click', function(e) {
        e.preventDefault();
        token_email = localStorage.getItem('token_email');
        send_new_password(token_email);
        // console.log("hola");
    }); 
}

function validate_new_password(){
    var error = false;

    if(document.getElementById('pass_rec').value.length === 0){
		document.getElementById('error_password_rec').innerHTML = "You have to write a password";
		error = true;
	}else{
        if(document.getElementById('pass_rec').value.length < 8){
            document.getElementById('error_password_rec').innerHTML = "The password must be longer than 8 characters";
            error = true;
        }else{
            document.getElementById('error_password_rec').innerHTML = "";
        }
    }

    if(document.getElementById('pass_rec_2').value != document.getElementById('pass_rec').value){
		document.getElementById('error_password_rec_2').innerHTML = "Passwords don't match";
		error = true;
	}else{
        document.getElementById('error_password_rec_2').innerHTML = "";
    }

    if(error == true){
        return 0;
    }
}

function send_new_password(token_email){
    if(validate_new_password() != 0){
        var data = {token_email: token_email, password : $('#pass_rec').val()};
       ajaxPromise(
            friendlyURL('?module=auth&op=new_password'),
            'POST',
            'JSON',
            { "data": data }
        ).then(function(result) {
            console.log(result);
           if(data == "done"){
                toastr.options.timeOut = 3000;
                toastr.success('New password changed');
                localStorage.setItem('location_auth', "SingIn");
                window.location.href = friendlyURL("?module=auth&op=view");
            } else {
                toastr.options.timeOut = 3000;
                toastr.error('Error seting new password');
            }
        }).catch(function(textStatus) {
            console.log("Error: New password error");
        });  
    }
}

function send_message_telegram(mensaje){
    // Enviar mensaje a Telegram

    }

    //////////////

function check_token_banned(token_input){
    var username_log = localStorage.getItem('username_banned');
    ajaxPromise(friendlyURL('?module=auth&op=data_token_banned'), 'POST', 'JSON', { 'username_log': username_log })
    .then(function(token) {
    //     
        if(token[0].token_banned == token_input){
            ajaxPromise(friendlyURL('?module=auth&op=user_state'), 'POST', 'JSON', { 'username_log': username_log, 'is_blocking': false })
            .then(function(result) { 
                send_message_telegram("Tu cuenta ha sido desbloqueada, puedes iniciar sesión de nuevo");
                Swal.fire({
                    title: '¡Cuenta Desbloqueada!',
                    text: 'Tu cuenta ha sido desbloqueada exitosamente. Ahora puedes iniciar sesión normalmente.',
                    icon: 'success',
                    confirmButtonText: 'Entendido',
                })
                localStorage.removeItem('cont_error');
                localStorage.removeItem('username_banned');
                localStorage.removeItem('token');

                window.location.href = friendlyURL("?module=auth&op=view");
            });
        }
    })
}



$(document).ready(function() {
    authy();
    clicks();
    click_recover_password();
    click_new_password();
});