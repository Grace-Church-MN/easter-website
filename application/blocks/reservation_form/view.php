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
	<div class="mbsc-grid">
		<div class="mbsc-row">
			<div class="mbsc-col">
				<label>
					Name
					<input mbsc-input id="Name" onKeyup="validateField(this, 'Name is required.')" />
				</label>
			</div>
			<div class="mbsc-col">
				<label>
					Email
					<input mbsc-input id="Email" onKeyup="validateField(this, 'Email is required.')" />
				</label>
			</div>
		</div>
		<div class="mbsc-row">
			<div class="mbsc-col">
				<label>
					Location
					<select id="Campus" onChange="setServiceTime(), resetServiceTime(), validateField(this, 'Location is required.')">
						<option disabled selected value></option>
						<option value="EP">Eden Prairie - Auditorium</option>
						<option value="Chapel">Eden Prairie - Chapel</option>
						<option value="CH">Chaska - Auditorium</option>
					</select>
				</label>
			</div>
			<div class="mbsc-col">
				<label>
					Service Time
					<select id="ServiceTime" onChange="getCount(), validateField(this, 'Service Time is required.')">

					</select>
				</label>
			</div>
		</div>
		<div class="mbsc-row">
			<div class="mbsc-col">
				<input id="Count" mbsc-stepper value="1" min="1" max="1" step="1" >
					Number of people in your party?
					<span class="mbsc-desc" id="countMessage"></span>
				</input>
			</div>
		</div>

		<div class="submit mbsc-row">
			 <button mbsc-button id="submitButton" type="submit" onClick="submit()">Submit</button>
		</div>
	</div>
</div>
