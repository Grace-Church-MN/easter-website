<?php defined('C5_EXECUTE') or die("Access Denied."); ?>

</div>

<?php View::element('footer_required'); ?>

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

</body>
</html>
