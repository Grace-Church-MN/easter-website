const db = firebase.firestore();
let list = new Map();
let availableSpots = "";
let maxSpots = 1;
let rawEventsData = {maxSpots:1};
let current = null;
let currentValues = {};
let pollingData = null;

var mobiscrollOpts = {
	display: 'bubble',
	touchUi: false,
	showOverlay: false
}
mobiscroll.settings = {
    theme: 'grace-church'
};
mobiscroll.select('#CampusEasterSunday', mobiscrollOpts);
mobiscroll.select('#CampusGoodFriday', mobiscrollOpts);
mobiscroll.select('#ServiceTimeEasterSunday', mobiscrollOpts);
mobiscroll.select('#ServiceTimeGoodFriday', mobiscrollOpts);
document.getElementById('ServiceTimeEasterSunday').disabled = true;
document.getElementById('ServiceTimeGoodFriday').disabled = true;

db.collection("reservation").doc("settings")
.onSnapshot((doc) => {
	rawEventsData = doc.data();
	parseEvents();
	processEvents();
});
db.collection("forms").doc("vo887dEdCz5hCQzbf5ns")
.onSnapshot((doc) => {
	currentValues = doc.data();
	parseEvents();
	processEvents();
	getCount('ES');
	getCount('GF');
	clearInterval(pollingData);
	pollingData = setInterval(function() { processEvents(); }, 1000);
});


function parseEvents() {
	let current = new Date();
	let reset = false;
	const events = JSON.parse(JSON.stringify(rawEventsData));
	events.times.forEach(event => {
		// If event is disabled, don't add it to the list
		if (event.disabled) {
			if (list.get(event.ID)) list.delete(event.ID);
			reset = true;
			return;
		}

		event.time = new Date(event.time.seconds * 1000);
		event.end = new Date(event.time.getTime() + (3600 * 1000));

		// If event is already over, don't include it
		if (current > new Date(event.end.getTime())) {
			if (list.get(event.ID)) list.delete(event.ID);
			reset = true;
			return;
		}

		let newdate = moment(event.time).format() + "_" + event.name;
		if(document.getElementById('ServiceTimeEasterSunday').value != "" && document.getElementById('ServiceTimeEasterSunday').value == event.ID){
			if(document.getElementById('CountEasterSunday').value >= currentValues[newdate]) {document.getElementById('CountEasterSunday').value = currentValues[newdate]; mobiscroll.stepper('#CountEasterSunday').max = currentValues[newdate];}
		}
		if(document.getElementById('ServiceTimeGoodFriday').value != "" && document.getElementById('ServiceTimeGoodFriday').value == event.ID){
			if(document.getElementById('CountGoodFriday').value >= currentValues[newdate]) {document.getElementById('CountGoodFriday').value = currentValues[newdate]; mobiscroll.stepper('#CountGoodFriday').max = currentValues[newdate];}
		}
		if(currentValues[newdate] <= 0) {
			event.hidden = true;
			if(document.getElementById('ServiceTimeEasterSunday').value != "" && document.getElementById('ServiceTimeEasterSunday').value == event.ID) {setTimeout(function(){ setServiceTime('ES'); resetServiceTime('ES'); }, 500);};
			if(document.getElementById('ServiceTimeGoodFriday').value != "" && document.getElementById('ServiceTimeGoodFriday').value == event.ID) {setTimeout(function(){ setServiceTime('GF'); resetServiceTime('GF'); }, 500);};
		}
		// Add event to list
		list.set(event.ID, event);
	});
	current = getNextEvent(current);
	if(reset == true){
		setServiceTime('ES');
		setServiceTime('GF');
	}
}

function resetServiceTime(service){
	field = ((service == 'ES') ? '#ServiceTimeEasterSunday' : '#ServiceTimeGoodFriday');
	mobiscroll.select(field, mobiscrollOpts).refresh();
}
function clearServiceFields(service){
	field = ((service == 'ES') ? '#CampusEasterSunday' : '#CampusGoodFriday');
	mobiscroll.select(field, mobiscrollOpts).clear();
	setServiceTime(service);
}

function processEvents(){
	const time = new Date();
	if (current) {
		if (time > new Date(list.get(current).end.getTime())) {
			current = null;
			parseEvents();
		}
	} else {
		current = getNextEvent(time);
	}
}

function getNextEvent(time) {
	if (list && list.size > 0) {
		let items = [...list.entries()].sort((a, b) => { return a[1].time.getTime() - b[1].time.getTime(); });
		return items[0][0];
	} else {
		return null;
	}
}
function setFields(field){
	if(field == 'eg'){
		document.getElementById('EasterSundayReservation').hidden = false;
		document.getElementById('GoodFridayReservation').hidden = false;
	} else if(field == 'e'){
		document.getElementById('EasterSundayReservation').hidden = false;
		document.getElementById('GoodFridayReservation').hidden = true;
		clearServiceFields('GF');
	} else {
		document.getElementById('EasterSundayReservation').hidden = true;
		document.getElementById('GoodFridayReservation').hidden = false;
		clearServiceFields('ES');
	}
}
function setServiceTime(service){
	serviceName = ((service == 'ES') ? 'Easter Sunday' : 'Good Friday');
	serviceTime = ((service == 'ES') ? 'ServiceTimeEasterSunday' : 'ServiceTimeGoodFriday');
	serviceMessage = ((service == 'ES') ? 'ServiceTimeLabelEasterSunday' : 'ServiceTimeLabelGoodFriday');
	campus = ((service == 'ES') ? 'CampusEasterSunday' : 'CampusGoodFriday');
	let disabled = false;
	let serviceMessageValid = false;
	select = document.getElementById(serviceTime);
	let set = `<option id="optionDisabled" disabled selected value=""></option>`;
	list.forEach((time, i) => {
		if(document.getElementById(campus).value != "" && time.name.includes(document.getElementById(campus).value) && time.service == serviceName){
			if(time.kids) serviceMessageValid = true;
			disabled = true;
			if(time.hidden){
				set += `<option disabled value='${time.ID}'>${(time.hidden) ? '(Full) ' : ''} ${(moment(time.time).minute() == 0) ? (moment(time.time).format('ha')).slice(0, -1) : (moment(time.time).format('h:mma')).slice(0, -1)}${(time.kids) ? '*' : ''}</option>`
			} else{
				set += `<option value='${time.ID}'>${(time.hidden) ? '(Full) ' : ''} ${(moment(time.time).minute() == 0) ? (moment(time.time).format('ha')).slice(0, -1) : (moment(time.time).format('h:mma')).slice(0, -1)}${(time.kids) ? '*' : ''}</option>`
			}
		}
	});
	if(disabled){
		select.disabled = false;
	} else {
		select.disabled = true;
	}
	if(serviceMessageValid){
		document.getElementById(serviceMessage).querySelector('.mbsc-label').innerHTML = "Service Time (*Kids Ministry Available for Ages 0-5)"
	} else {
		document.getElementById(serviceMessage).querySelector('.mbsc-label').innerHTML = "Service Time"
	}
	select.innerHTML = set;
	getCount(service);
}

function getCount(service) {
	serviceTime = ((service == 'ES') ? 'ServiceTimeEasterSunday' : 'ServiceTimeGoodFriday');
	count = ((service == 'ES') ? 'CountEasterSunday' : 'CountGoodFriday');
	countMessage = ((service == 'ES') ? 'CountMessageEasterSunday' : 'CountMessageGoodFriday');
	campus = ((service == 'ES') ? 'CampusEasterSunday' : 'CampusGoodFriday');
	kidsMessageElement = ((service == 'ES') ? 'KidsMessageEasterSunday' : 'KidsMessageGoodFriday');
	kidsMessageCheckBox = ((service == 'ES') ? 'KidsMessageCheckboxEasterSunday' : 'KidsMessageCheckboxGoodFriday');
	if(document.getElementById(count).value && document.getElementById(serviceTime).value != "") {
		let newdate = moment(list.get(document.getElementById(serviceTime).value).time).format() + "_" + list.get(document.getElementById(serviceTime).value).name;
		maxSpots = ((currentValues[newdate] <= rawEventsData.maxSpots) ? currentValues[newdate] : rawEventsData.maxSpots);
		let c = document.getElementById(count);
		c.max = maxSpots;
		mobiscroll.stepper('#' + count).max = maxSpots;

		let val = 0;
		if (document.getElementById(campus).value == "CH") {
			val = rawEventsData.CHCapacity;
		} else if (document.getElementById(campus).value == "EP") {
			val = rawEventsData.EPCapacity;
		} else if (document.getElementById(campus).value == "Chapel") {
			val = rawEventsData.ChapelCapacity;
		}
		availableSpots = ((currentValues[newdate] / val * 100) < 6) ? currentValues[newdate] : Math.floor(currentValues[newdate] / val * 100) + "%";
	}

	if(document.getElementById(serviceTime).value != "" && document.getElementById(campus).value != "") {
		document.getElementById(countMessage).innerHTML = `${(availableSpots.toString().includes('%')) ? 'Available Capacity:' : 'Available Spots:'} ${availableSpots}`;
	} else {
		document.getElementById(countMessage).innerHTML = 'Please select a location and service time to see available spots.';
	}
	if(document.getElementById(serviceTime).value != '' && list.get(document.getElementById(serviceTime).value).kids){
		document.getElementById(kidsMessageElement).innerHTML = `<label><input id='${kidsMessageCheckBox}' mbsc-checkbox type="checkbox"></label><span>I have kids ages 0-5 and require assistance reserving their spot on the Grace App.</span>`
	} else {
		document.getElementById(kidsMessageElement).innerHTML = "";
	}
}

function validateField(field, message){
	if(field.value != "" && message == "Please enter a valid email address"){
		let r = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-. ]+$');
		if(field.value.match(r)) {
			clearErrorState(field);
			return true;
		} else {
			addErrorState(field, 'Email is invalid.');
		}
	} else if(field.value == ""){
		addErrorState(field, message);
	} else {
		clearErrorState(field);
		return true;
	}
}

function addErrorState(field, message) {
	let parent = field.parentNode;
	errorMsg = parent.querySelector('.mbsc-err-msg');
	parent.parentNode.classList.add('mbsc-err');
	if (!errorMsg) {
		errorMsg = document.createElement('span');
		errorMsg.className = 'mbsc-err-msg';
		parent.appendChild(errorMsg);
	}
	errorMsg.innerHTML = message;
}

function clearErrorState(field) {
	let parent = field.parentNode;
	errorMsg = parent.querySelector('.mbsc-err-msg');

	parent.parentNode.classList.remove('mbsc-err');
	if (errorMsg) {
		parent.removeChild(errorMsg);
	}
}

function submit(){
	let val = document.getElementById('ServiceSelection').value;
	let validES = false;
	let validGF = false;
	let nameValid = false;
	let emailValid = false;
	let locationESValid = false;
	let serviceESValid = false;
	let locationGFValid = false;
	let serviceGFValid = false;
	if(validateField(document.getElementById('Name'), 'Please enter your name')) nameValid = true;
	if(validateField(document.getElementById('Email'), 'Please enter a valid email address')) emailValid = true;
	if(validateField(document.getElementById('CampusEasterSunday'), 'Please select a location')) locationESValid = true;
	if(validateField(document.getElementById('ServiceTimeEasterSunday'), 'Please select a service time')) serviceESValid = true;
	if(validateField(document.getElementById('CampusGoodFriday'), 'Please select a location')) locationGFValid = true;
	if(validateField(document.getElementById('ServiceTimeGoodFriday'), 'Please select a service time')) serviceGFValid = true;

	let send = [];
	let name = document.getElementById('Name').value;
	let email = document.getElementById('Email').value.trim();

	if(val == 'eg' || val == 'e'){
		if(nameValid && emailValid && locationESValid && serviceESValid){
			validES = true;
			serviceTimeTemp = list.get(document.getElementById('ServiceTimeEasterSunday').value);
			serviceTime = Object.assign({}, serviceTimeTemp);

			if (document.getElementById('CampusEasterSunday').value == "CH") {
				campus = "Chaska";
			} else if (document.getElementById('CampusEasterSunday').value == "EP") {
				campus = "Eden Prairie";
			} else { campus = "Chapel"; }

			appHelp = false;
			if(document.getElementById('KidsMessageCheckboxEasterSunday') && document.getElementById('KidsMessageCheckboxEasterSunday').checked) appHelp = true;
			serviceTime.time = serviceTime.time.getTime() / 1000;
			send.push({Name: name, Email: email, Campus:campus, ServiceTime: serviceTime, Count: document.getElementById('CountEasterSunday').value, AppHelp: appHelp});
		} else{
			validES = false;
		}
	}
	if(val == 'eg' || val == 'g'){
		if(nameValid && emailValid && locationGFValid && serviceGFValid){
			validGF = true;
			serviceTimeTemp = list.get(document.getElementById('ServiceTimeGoodFriday').value);
			serviceTime = Object.assign({}, serviceTimeTemp);

			if (document.getElementById('CampusGoodFriday').value == "CH") {
				campus = "Chaska";
			} else if (document.getElementById('CampusGoodFriday').value == "EP") {
				campus = "Eden Prairie";
			} else { campus = "Chapel"; }

			appHelp = false;
			if(document.getElementById('KidsMessageCheckboxGoodFriday') && document.getElementById('KidsMessageCheckboxGoodFriday').checked) appHelp = true;
			serviceTime.time = serviceTime.time.getTime() / 1000;
			send.push({Name: name, Email: email, Campus:campus, ServiceTime: serviceTime, Count: document.getElementById('CountGoodFriday').value, AppHelp: appHelp});
		} else{
			validGF = false;
		}
	}

	if((val == 'eg' && validES && validGF) || (val == 'e' && validES) || (val == 'g' && validGF)){
		console.log(send);
		let sendTemp = {data:send};
		document.getElementById('submitButton').disabled = true;
		$.post('https://us-central1-grace-church-161321.cloudfunctions.net/api/forms/submit/vo887dEdCz5hCQzbf5ns', sendTemp).done(function( res ) {
			if(res.success){
				window.location.href = reservationFormRedirectURL;
			} else {
				mobiscroll.alert({
					title: 'Error',
					message: 'An unknown error occurred. Please try again.'
				});
			}
		});
	} else {
		mobiscroll.alert({
			title: 'Error',
			message: 'Please fill out all require fields'
		});
	}
}
