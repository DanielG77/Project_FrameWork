<?php
    class controller_auth {
        function view() {
            // echo 'hola view';
            // exit;
            common::load_view('top_page_auth.html', VIEW_PATH_AUTH . 'auth.html');
        }
    }
?>