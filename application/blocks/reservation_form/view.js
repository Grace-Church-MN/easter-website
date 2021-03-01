const db = firebase.firestore();
let list = new Map();
let availableSpots = "";
let maxSpots = 1;
let rawEventsData = {maxSpots:1};
let current = null;
let currentValues = {};
let pollingData = null;

mobiscroll.select('#ServiceTime', {
	touchUi: false
});


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
	getCount();
	clearInterval(pollingData);
	pollingData = setInterval(function() { processEvents(); }, 1000);
});


function parseEvents() {
	let current = new Date();
	let reset = false;
	const events = JSON.parse(JSON.stringify(rawEventsData));
	events.times.forEach(event => {
		// If event is disabled, don't add it to the list
		if (!event.disabled) {
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
		if(document.getElementById('ServiceTime').value != "" && document.getElementById('ServiceTime').value == event.ID){
			if(document.getElementById('Count').value >= currentValues[newdate]) {document.getElementById('Count').value = currentValues[newdate]; mobiscroll.stepper('#Count').max = currentValues[newdate];}
		}
		if(currentValues[newdate] <= 0) {
			event.hidden = true;
			if(document.getElementById('ServiceTime').value != "" && document.getElementById('ServiceTime').value == event.ID) {setTimeout(function(){ setServiceTime(); resetServiceTime(); }, 500);};
		}
		// Add event to list
		list.set(event.ID, event);
	});
	current = getNextEvent(current);
	if(reset == true){
		setServiceTime();
	}
}

function resetServiceTime(){
	mobiscroll.select("#ServiceTime").refresh();
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

function setServiceTime(){
	let disabled = false;
	select = document.getElementById('ServiceTime');
	let set = `<option id="optionDisabled" disabled selected value=""></option>`;
	list.forEach((time, i) => {
		if(document.getElementById('Campus').value != "" && time.name.includes(document.getElementById('Campus').value)){
			disabled = true;
			if(time.hidden){
				set += `<option disabled value='${time.ID}'>${(time.hidden) ? '(Full) ' : ''} ${time.service} - ${moment(time.time).format('MMM D')} at ${moment(time.time).format('h:mm A')}</option>`
			} else{
				set += `<option value='${time.ID}'>${(time.hidden) ? '(Full) ' : ''} ${time.service} - ${moment(time.time).format('MMM D')} at ${moment(time.time).format('h:mm A')}</option>`
			}
		} else {
		}
	});
	if(disabled){
		select.disabled = false;
	} else {
		select.disabled = true;
	}

	select.innerHTML = set;
	getCount();
}

function getCount() {
	if(document.getElementById('Count').value && document.getElementById('ServiceTime').value != "") {
		let newdate = moment(list.get(document.getElementById('ServiceTime').value).time).format() + "_" + list.get(document.getElementById('ServiceTime').value).name;
		maxSpots = ((currentValues[newdate] <= rawEventsData.maxSpots) ? currentValues[newdate] : rawEventsData.maxSpots);
		let count = document.getElementById('Count');
		count.max = maxSpots;
		mobiscroll.stepper('#Count').max = maxSpots;

		let val = 0;
		if (document.getElementById('Campus').value == "CH") {
			val = rawEventsData.CHCapacity;
		} else if (document.getElementById('Campus').value == "EP") {
			val = rawEventsData.EPCapacity;
		} else if (document.getElementById('Campus').value == "Chapel") {
			val = rawEventsData.ChapelCapacity;
		}
		availableSpots = ((currentValues[newdate] / val * 100) < 6) ? currentValues[newdate] : Math.floor(currentValues[newdate] / val * 100) + "%";
	}

	if(document.getElementById('ServiceTime').value != "" && document.getElementById('Campus').value != "") {
		document.getElementById('countMessage').innerHTML = `${(availableSpots.toString().includes('%')) ? 'Available Capacity:' : 'Available Spots:'} ${availableSpots}`;
	} else {
		document.getElementById('countMessage').innerHTML = 'Please select a location and service time to see available spots.';
	}
}

function validateField(field, message){
	if(field.value != "" && message == "Email is required."){
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
	let nameValid = false;
	let emailValid = false;
	let locationValid = false;
	let serviceValid = false;
	if(validateField(document.getElementById('Name'), 'Name is required.')) nameValid = true;
	if(validateField(document.getElementById('Email'), 'Email is required.')) emailValid = true;
	if(validateField(document.getElementById('Campus'), 'Location is required.')) locationValid = true;
	if(validateField(document.getElementById('ServiceTime'), 'Service Time is required.')) serviceValid = true;

	if(nameValid && emailValid && locationValid && serviceValid){
		let campus = "";
		let serviceTime = list.get(document.getElementById('ServiceTime').value);
		let email = document.getElementById('Email').value.trim();

		if (document.getElementById('Campus').value == "CH") {
			campus = "Chaska";
		} else if (document.getElementById('Campus').value == "EP") {
			campus = "Eden Prairie";
		} else { campus = "Chapel"; }

		serviceTime.time = serviceTime.time.getTime() / 1000;

		let send = {Name: document.getElementById('Name').value, Email: email, Campus:campus, ServiceTime: serviceTime, Count: document.getElementById('Count').value};

		$.post('https://us-central1-grace-church-161321.cloudfunctions.net/api/forms/submit/vo887dEdCz5hCQzbf5ns', send).done(function( res ) {
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
