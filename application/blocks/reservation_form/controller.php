<?php

namespace Application\Block\ReservationForm;

use Concrete\Core\Block\BlockController;
use Core;

defined('C5_EXECUTE') or die(_("Access Denied."));

class Controller extends BlockController
{

	protected $btInterfaceWidth = "350";
	protected $btInterfaceHeight = "240";
	protected $btDefaultSet = 'basic';

	public function on_start(){
		$al = \Concrete\Core\Asset\AssetList::getInstance();
		$al->register(
			'javascript', 'mobiscroll.js', 'blocks/reservation_form/js/mobiscroll.javascript.lite.min.js',
		);
		$al->register(
			'javascript', 'moment.js', 'blocks/reservation_form/js/moment.js',
		);

		//$al->registerGroup('reservationFormAssets', array(
		//	array('javascript', 'mobiscroll'),
		//	array('javascript', 'moment.js')
		//));
	}
	public function getBlockTypeName(){
		return t('Reservation Form');
	}
//	public function registerViewAssets($outputContent = '') {
//		$this->requireAsset('reservationFormAssets');
//	}
}
