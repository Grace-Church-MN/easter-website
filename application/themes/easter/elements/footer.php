<?php defined('C5_EXECUTE') or die("Access Denied."); ?>

<footer id="footer-theme">
  <div class="container">
      <div class="row">
          <div class="col-12">
              <?php
              $a = new GlobalArea('Footer Legal');
              $a->display();
              ?>
          </div>
      </div>
  </div>
</footer>

<?php $this->inc('elements/footer_bottom.php');?>
