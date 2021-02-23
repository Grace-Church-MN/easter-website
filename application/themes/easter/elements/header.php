<?php defined('C5_EXECUTE') or die("Access Denied.");

$this->inc('elements/header_top.php');

?>

<header>
    <div class="container">
        <div class="row">
            <div class="col-sm-4 col-xs-6">
                <?php
                $a = new GlobalArea('Header Site Title');
                $a->display();
                ?>
            </div>
            <div class="<?php echo ($displayThirdColumn) ? 'col-sm-5 col-xs-6' : 'col-sm-8 col-xs-6' ?>">
                <?php
                $a = new GlobalArea('Header Navigation');
                $a->display();
                ?>
            </div>
        </div>
    </div>
</header>
