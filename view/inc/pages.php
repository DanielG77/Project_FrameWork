<?php
if(isset($_GET["page"])){
	switch($_GET['page']){
		case "ctrl_home";
			include("module/home/controller/".$_GET['page'].".php");
			break;
		case "ctrl_shop";
			include("module/shop/controller/".$_GET['page'].".php");
			break;
		case "ctrl_auth";
			include("module/auth/controller/".$_GET['page'].".php");
		break;
		case "404";
			include("view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include("view/inc/error".$_GET['page'].".php");
			break;
		default;
			include("module/home/view/home.html");
			break;
	}
}else{
	include("module/home/view/home.html");
}
?>