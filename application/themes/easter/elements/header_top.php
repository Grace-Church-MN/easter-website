<?php defined('C5_EXECUTE') or die("Access Denied."); ?>
<!DOCTYPE html>
<html lang="<?php echo Localization::activeLanguage() ?>">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" type="text/css" href="<?php echo $view->getThemePath()?>/css/bootstrap-modified.css">
    <?php echo $html->css($view->getStylesheet('main.less')) ?>
    <?php
    View::element('header_required', [
        'pageTitle' => isset($pageTitle) ? $pageTitle : '',
        'pageDescription' => isset($pageDescription) ? $pageDescription : '',
        'pageMetaKeywords' => isset($pageMetaKeywords) ? $pageMetaKeywords : ''
    ]);
    ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement('style');
            msViewportStyle.appendChild(
                document.createTextNode(
                    '@-ms-viewport{width:auto!important}'
                )
            );
            document.querySelector('head').appendChild(msViewportStyle);
        }
    </script>
	<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore.js"></script>

	<script>
	    var firebaseConfig = {
	      apiKey: "AIzaSyBB0rNCvALUuQNzTyXMbJFpsg4ND9HonfA",
	      authDomain: "grace-church-161321.firebaseapp.com",
	      databaseURL: "https://grace-church-161321.firebaseio.com",
	      projectId: "grace-church-161321",
	      storageBucket: "grace-church-161321.appspot.com",
	      messagingSenderId: "133079931260",
	      appId: "1:133079931260:web:90fc12e7d73f170e3d6cf9"
	    };

	    firebase.initializeApp(firebaseConfig);
	  </script>
</head>
<body>

<div class="<?php echo $c->getPageWrapperClass()?>">
