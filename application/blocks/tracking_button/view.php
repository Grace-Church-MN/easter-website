<?php
defined('C5_EXECUTE') or die('Access Denied.');

$allowed_query_params = ["utm_source", "utm_medium", "utm_campaign"];
?>
<a href="<?= $data['href'].$controller->build_http_query($_GET, $allowed_query_params) ?>" <?php if ($data['openNew'] == 1){ echo 'target="_blank"'; } ?>>
	<div class="tracking-button">
		<?= $data['title'] ?>
	</div>
</a>