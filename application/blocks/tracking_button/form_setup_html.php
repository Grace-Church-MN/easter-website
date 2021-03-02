 <?php
defined('C5_EXECUTE') or die('Access Denied.');

$app = \Concrete\Core\Support\Facade\Application::getFacadeApplication();
$token = $app->make('helper/validation/token');

$fp = FilePermissions::getGlobal();
$tp = new TaskPermission();
?>

<div class="ccm-trackbutton-block-container">
    <div class="form-group">
        <label><?php echo t('Button Text'); ?></label>
        <input type="text" name="title" value="<?= $data['title'] ?>" />
    </div>
    <div class="form-group">
        <label><?php echo t('Destination'); ?></label>
        <input type="text" name="href" value="<?= $data['href'] ?>" />
    </div>
    <div class="checkbox" class="form-group">
        <label>
            <input type="checkbox" name="openNew" value="1" <?php if ($data['openNew'] == 1){ echo 'checked '; } ?>/>
            <?php echo t('Open Link in New Window'); ?>
        </label>
    </div>
</div>
