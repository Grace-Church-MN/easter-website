<?php
defined('C5_EXECUTE') or die('Access Denied.');
$c = Page::getCurrentPage();
?>

<?php
if (count($rows) > 0) {
	$rows[0]['class'] = 'nav-first';
	foreach ($rows as &$rowp) {
		if ($rowp['internalLinkCID'] === $c->getCollectionID()) {
			$rowp['class'] .= ' nav-selected';
		}
	}
?>
	<ul class="nav" id="manual-nav">
<?php
	foreach ($rows as $row) {
		$title = null;
		if ($row['title'] != null) {
			$title = $row['title'];
		} elseif ($row['collectionName'] != null) {
			$title = $row['collectionName'];
		} else {
			$title = t('(Untitled)');
		}
?>
		<li class="<?php echo $row['class']; ?>">
			<a class="nav-link" href="<?php echo $row['linkURL']; ?>" <?php echo $row['openInNewWindow'] ? 'target="_blank"' : ''; ?>>
				<?php echo h($title); ?>
			</a>
		</li>
<?php
	}
?>
	</ul>
	<div id="menu-button" class="hamburger hamburger--slider">
		<div class="hamburger-box">
			<div class="hamburger-inner"></div>
		</div>
	</div>
<?php
} else {
?>
	<div class="ccm-manual-nav-placeholder">
		<p><?php echo t('No nav Entered.'); ?></p>
	</div>
<?php
}
?>
