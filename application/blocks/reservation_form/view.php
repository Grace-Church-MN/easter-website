<?php defined('C5_EXECUTE') or die(_("Access Denied.")) ?>

<div mbsc-form id="reservation">
	<div class="mbsc-grid">
		<div class="message mbsc-row">
			<div class="mbsc-col">
				<text>Please reserve your seat for the Good Friday or Easter services you plan attend by filling out the form below. If you are feeling any symptoms or have been exposed to COVID-19, we ask that you remain home and stream the service at <a href="https://grace.live" target="_new">www.grace.live</a>.</text>
			</div>
		</div>

		<div class="mbsc-row">
			<div class="mbsc-col">
				<label>
					Name
					<input mbsc-input id="Name" required />
				</label>
			</div>
			<div class="mbsc-col">
				<label>
					Email
					<input mbsc-input id="Email" required />
				</label>
			</div>
		</div>
		<div class="mbsc-row">
			<div class="mbsc-col">
				<label>
					Location
					<select id="Campus" onChange="setServiceTime()" required>
						<option disabled selected value></option>
						<option value="Chapel">Eden Prairie Chapel</option>
						<option value="CH">Chaska Audtiorium</option>
						<option value="EP">Eden Prairie Audtiorium</option>
					</select>
				</label>
			</div>
			<div class="mbsc-col">
				<label>
					Service Time
					<select id="ServiceTime" onChange="getCount()" required>

					</select>
				</label>
			</div>
		</div>
		<div class="mbsc-row">
			<div class="mbsc-col">
				<input id="Count" mbsc-stepper value="1" min="1" step="1" >
					Number of people in your party?
					<span class="mbsc-desc" id="countMessage"></span>
				</input>
			</div>
		</div>
		<div class="mbsc-row">
			<div class="mbsc-col">
				<text><small><i>Notice: While Grace Church has been very careful to follow the CDC guidelines to provide a safe environment, we cannot guarantee you or those in your party will not contract COVID-19. Thank you for doing your part to help prevent the spread of coronavirus.</i></small></text>
			</div>
		</div>

		<div class="submit mbsc-row">
			 <button mbsc-button type="submit" onClick="submit()">Submit</button>
		</div>
	</div>
</div>
