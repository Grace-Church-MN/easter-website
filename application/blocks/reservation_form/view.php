<?php
	defined('C5_EXECUTE') or die(_("Access Denied."));

	function build_http_query($query, $allowed_keys) {
		$query_array = [];

		$i = 0;
		foreach($query as $key => $value) {
			$i++;
			if (in_array($key, $allowed_keys)) {
				$query_array[] = urlencode( $key ) . '=' . urlencode( $value );
				if (count($query) > $i) $query_array[] = '&';
			}
		}

		if (count($query_array) > 0) array_unshift($query_array, '?');

		return implode('', $query_array);
	}

	$allowed_query_params = ["utm_source", "utm_medium", "utm_campaign"];
	$page = Page::getCurrentPage();
	$pageID = $page->getCollectionID();
	$pl = new \Concrete\Core\Page\PageList();
	$pl->filterByParentID($pageID);  // Add parent page ID here.
	$pages = $pl->getResults();
	$n = 0;
	foreach($pages as $page) {
	    $n++;
	    if($n == 1) {
			 $path = $page->getCollectionLink();
	    }
	}

	echo "<script type=\"text/javascript\">var reservationFormRedirectURL = \"".$path.build_http_query($_GET, $allowed_query_params)."\";</script>"
?>

<div mbsc-form id="reservation">
	<div class="mbsc-form-group">
		<div class="mbsc-grid">
			<div class="mbsc-row">
				<div class="mbsc-col-12 mbsc-col-md-6">
					<label>
						Name
						<input mbsc-input id="Name" onKeyup="validateField(this, 'Please enter your name')" />
					</label>
				</div>
				<div class="mbsc-col-12 mbsc-col-md-6">
					<label>
						Email
						<input mbsc-input id="Email" onKeyup="validateField(this, 'Please enter a valid email address')" />
					</label>
				</div>
			</div>
			<div id="ServiceSelect">
				<div class="mbsc-row">
					<div class="mbsc-col-12 mbsc-col-md-6">
						<label>
							Which service would you like to attend?
							<select id="ServiceSelection" onChange="setFields(this.value), validateField(this, 'Please select a Service')">
								<option disabled selected value></option>
								<option value="eg">Easter and Good Friday</option>
								<option value="e">Easter Only</option>
								<option value="g">Good Friday Only</option>
							</select>
						</label>
					</div>
				</div>
			</div>
			<div hidden="true" id="EasterSundayReservation">
				<span class="title">Easter Sunday Reservation</span>
				<div class="mbsc-row">
					<div class="mbsc-col-12 mbsc-col-md-6">
						<label>
							Location
							<select id="CampusEasterSunday" onChange="setServiceTime('ES'), resetServiceTime('ES'), validateField(this, 'Please select a location')">
								<option disabled selected value></option>
								<option value="EP">Eden Prairie Auditorium</option>
								<option value="Chapel">Eden Prairie Chapel</option>
								<option value="CH">Chaska Auditorium</option>
							</select>
						</label>
					</div>
					<div class="mbsc-col-12 mbsc-col-md-6">
						<label id="ServiceTimeLabelEasterSunday">
							Service Time
							<select id="ServiceTimeEasterSunday" onChange="getCount('ES'), validateField(this, 'Please select a service time')">

							</select>
						</label>
					</div>
				</div>
				<div id="KidsMessageEasterSunday" class="checkbox">
				</div>
				<div class="mbsc-row">
					<div class="mbsc-col-12">
						<label>
							<input id="CountEasterSunday" mbsc-stepper value="1" min="1" max="1" step="1" >
								Number of people in your party?
								<span class="mbsc-desc" id="CountMessageEasterSunday"></span>
							</input>
						</label>
					</div>
				</div>
			</div>
			<div hidden="true" id="GoodFridayReservation">
				<span class="title">Good Friday Reservation</span>
				<div class="mbsc-row">
					<div class="mbsc-col-12 mbsc-col-md-6">
						<label>
							Location
							<select id="CampusGoodFriday" onChange="setServiceTime('GF'), resetServiceTime('GF'), validateField(this, 'Please select a location')">
								<option disabled selected value></option>
								<option value="EP">Eden Prairie Auditorium</option>
								<option value="CH">Chaska Auditorium</option>
							</select>
						</label>
					</div>
					<div class="mbsc-col-12 mbsc-col-md-6">
						<label id="ServiceTimeLabelGoodFriday">
							Service Time
							<select id="ServiceTimeGoodFriday" onChange="getCount('GF'), validateField(this, 'Please select a service time')">

							</select>
						</label>
					</div>
				</div>
				<div id="KidsMessageGoodFriday" class="checkbox">

				</div>
				<div class="mbsc-row">
					<div class="mbsc-col-12">
						<label>
							<input id="CountGoodFriday" mbsc-stepper value="1" min="1" max="1" step="1" >
								Number of people in your party?
								<span class="mbsc-desc" id="CountMessageGoodFriday"></span>
							</input>
						</label>
					</div>
				</div>
			</div>
			<div class="submit mbsc-row">
				<div class="mbsc-col-12">
					<label>
						<button mbsc-button id="submitButton" type="submit" onClick="submit()">Submit</button>
					</label>
				</div>
			</div>
		</div>
	</div>
</div>
