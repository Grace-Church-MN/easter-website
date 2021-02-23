<?php defined('C5_EXECUTE') or die("Access Denied."); ?>

<footer id="footer-theme">
    <section>
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <?php
                    $a = new GlobalArea('Footer Legal');
                    $a->display();
                    ?>
                </div>
                <div class="col-sm-3">
                  <span class="pull-right">
                      <?php echo Core::make('helper/navigation')->getLogInOutLink() ?>
                  </span>
                </div>
            </div>
        </div>
    </section>
</footer>

<?php $this->inc('elements/footer_bottom.php');?>
