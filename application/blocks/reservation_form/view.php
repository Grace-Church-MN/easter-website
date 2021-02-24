<?php defined('C5_EXECUTE') or die(_("Access Denied.")) ?>

<div mbsc-form id="myForm">
	<div class="mbsc-grid">
		<div class="mbsc-row">
			<div class="mbsc-col">
				<label>
					Name
					<input mbsc-input id="Name" />
				</label>
			</div>
			<div class="mbsc-col">
				<label>
					Email
					<input mbsc-input id="Email" />
				</label>
			</div>
		</div>
		<div class="mbsc-row">
			<div class="mbsc-col">
				<label>
					Location
					<select id="Campus" onChange="setServiceTime()">
						<option disabled selected value></option>
						<option value="Chapel">Chapel</option>
						<option value="CH">Chaska</option>
						<option value="EP">Eden Prairie</option>
					</select>
				</label>
			</div>
			<div class="mbsc-col">
				<label>
					Service Time
					<select id="ServiceTime">

					</select>
				</label>
			</div>
		</div>
		<div class="mbsc-row">
			<div class="mbsc-col">
				<input id="Count" mbsc-stepper value="1" min="1" max="50" step="1">
					Number of people in your party?
					<span class="mbsc-desc" *ngIf="!form.controls.Campus.dirty || !form.controls.ServiceTime.dirty">Please select a location and service time to see available spots.</span>
					<span class="mbsc-desc" *ngIf="form.controls.Campus.dirty && form.controls.ServiceTime.dirty">{{(availableSpots.toString().includes('%')) ? 'Available Capacity:' : 'Available Spots:'}} {{availableSpots}}</span>
				</input>
			</div>
		</div>
		<div class="mbsc-row">
			 <button mbsc-button type="submit" onClick="submit()">Submit</button>
		</div>
	</div>
</div>
