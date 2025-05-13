<?php
    spl_autoload_register(null,false);
    spl_autoload_extensions('.php,.class.php');
    spl_autoload_register('loadClasses');

    function loadClasses($className){
        // controller
        if (file_exists(CONTROLLER_PATH.$className.'.class.php')){
            include_once CONTROLLER_PATH.$className.'.class.php';
        }
        // model
        if (file_exists(MODEL_PATH.$className.'.class.php')){
            include_once MODEL_PATH.$className.'.class.php';
        }
        // module controller
        if (file_exists(MODULES_PATH.strtolower($className).'/controller/'.strtolower($className).'.class.php')) {
            include_once MODULES_PATH.strtolower($className).'/controller/'.strtolower($className).'.class.php';
        }
        // module model
        if (file_exists(MODULES_PATH.strtolower($className).'/model/'.$className.'.class.php')) {
            include_once MODULES_PATH.strtolower($className).'/model/'.$className.'.class.php';
        }
        // components controller
        if (file_exists(COMPONENTS_PATH.strtolower($className).'/controller/'.strtolower($className).'.class.php')) {
            include_once COMPONENTS_PATH.strtolower($className).'/controller/'.strtolower($className).'.class.php';
        }
        // components model
        if (file_exists(COMPONENTS_PATH.strtolower($className).'/model/'.$className.'.class.php')) {
            include_once COMPONENTS_PATH.strtolower($className).'/model/'.$className.'.class.php';
        }
    }