<?php 
	defined('C5_EXECUTE') or die(_("Access Denied."));

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

	echo "<script type=\"text/javascript\">var reservationFormRedirectURL = \"".$path."\";</script>"
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
			<div class="mbsc-row">
				<div class="mbsc-col-12 mbsc-col-md-6">
					<label>
						Location
						<select id="Campus" onChange="setServiceTime(), resetServiceTime(), validateField(this, 'Please select a location')">
							<option disabled selected value></option>
							<option value="EP">Eden Prairie - Auditorium</option>
							<option value="Chapel">Eden Prairie - Chapel</option>
							<option value="CH">Chaska - Auditorium</option>
						</select>
					</label>
				</div>
				<div class="mbsc-col-12 mbsc-col-md-6">
					<label>
						Service Time
						<select id="ServiceTime" onChange="getCount(), validateField(this, 'Please select a service time')">

						</select>
					</label>
				</div>
			</div>
			<div class="mbsc-row">
				<div class="mbsc-col-12">
					<label>
						<input id="Count" mbsc-stepper value="1" min="1" max="1" step="1" >
							Number of people in your party?
							<span class="mbsc-desc" id="countMessage"></span>
						</input>
					</label>
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
