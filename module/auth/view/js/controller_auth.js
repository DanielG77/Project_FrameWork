function authy() {
    var location_auth = localStorage.getItem('location_auth') || false;
    if(location_auth=='SingIn'){
        authyread('SingIn');
    }else{
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
                
                "<svg xmlns='http://www.w3.org/2000/svg' class='site__logo' href='index.php?page=ctrl_home&op=list' width='56' height='84' viewBox='77.7 214.9 274.7 412'><defs><linearGradient id='a' x1='0%' y1='0%' y2='0%'><stop offset='0%' stop-color='#8ceabb'/><stop offset='100%' stop-color='#378f7b'/></linearGradient></defs><path fill='url(#a)' d='M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z'/></svg>" +
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
                    "<div class='form__field'>" +
                        "<p>¿Ya tienes una cuenta? <button class='login-link' id='login-link'>Sign In</button></p>" +
                    "</div>" +
                "</form>" +

                "</div>"
            );
        }
    else{
        $('<div></div>')
            .addClass("register")
            .appendTo('#grid_align__item')
            .html(
                
                "<svg xmlns='http://www.w3.org/2000/svg' class='site__logo' href='index.php?page=ctrl_home&op=list' width='56' height='84' viewBox='77.7 214.9 274.7 412'><defs><linearGradient id='a' x1='0%' y1='0%' y2='0%'><stop offset='0%' stop-color='#8ceabb'/><stop offset='100%' stop-color='#378f7b'/></linearGradient></defs><path fill='url(#a)' d='M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z'/></svg>" +
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

        ajaxPromise('/programas/courses_home/module/auth/controller/ctrl_auth.php?op=register', 'POST', 'JSON', { 'email': email, 'username': username, 'passworda': passworda })
            .then(function(result) {
                // console.log(result);
                if (result == "email_exist") {
                    document.getElementById('error_email_log').innerHTML = "El email ya esta en uso, asegurate de no tener ya una cuenta"
                } else if (result == "username_exist") {
                    document.getElementById('error_usern_log').innerHTML = "El usuario ya esta en uso, intentalo con otro"
                } else if (result == "ok") {
                    console.log("QUE ES ESTO");
                    Swal.fire({
                        title: '¡Registro exitoso!',
                        text: 'Tu cuenta ha sido creada correctamente.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    localStorage.setItem('location_auth', "SingIn");
                    setTimeout(' window.location.href = "index.php?module=ctrl_auth&op=list"; ', 1000);
                }
            });
    }
}

function signin() {
    // console.log(validateSignUp()); PARA Iniciar Session
    if (validateSignIn() != true) {
        username_log = ($('#user_email').val());
        password_log = ($('#passwordlog').val());
        ajaxPromise('/programas/courses_home/module/auth/controller/ctrl_auth.php?op=login', 'POST', 'JSON', { 'username_log': username_log, 'password_log': password_log })
            .then(function(result) {
                console.log(result);
                    if (result == "error_user") {
                        document.getElementById('error_usema_log').innerHTML = "El usario no existe,asegurase de que lo a escrito correctamente"
                    } 
                    else if (result == "error_passwd") {
                        document.getElementById('error_fpass_log').innerHTML = "La contraseña es incorrecta"
                    }
                    else {
                        localStorage.setItem("token", result);
                        Swal.fire({
                            title: 'Loggin con Exito',
                            text: 'Bienvenido de nuevo usuario.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        setTimeout(' window.location.href = "index.php?module=ctrl_shop&op=list"; ', 1000);
                            if (localStorage.getItem('redirect_like')) {
                            setTimeout(' window.location.href = "index.php?module=ctrl_shop&op=list"; ', 1000);
                        } else {
                            setTimeout(' window.location.href = "index.php?module=ctrl_home&op=list"; ', 1000);
                        }
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

    $('#register-link').on('click', function() {
        localStorage.setItem('location_auth', "SingIn");
        window.location.reload;
    });

    $('#login-link').on('click', function() {
        localStorage.removeItem('location_auth');
        window.location.reload;

    });
    
}

$(document).ready(function() {
    authy();
    clicks();
});