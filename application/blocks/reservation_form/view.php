<?php defined('C5_EXECUTE') or die(_("Access Denied.")) ?>

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
						<option value="EP">Eden Prairie - Audtiorium</option>
						<option value="Chapel">Eden Prairie - Chapel</option>
						<option value="CH">Chaska - Audtiorium</option>
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
			 <button mbsc-button type="submit" onClick="submit()">Submit</button>
		</div>
	</div>
</div>
