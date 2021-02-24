const db = firebase.firestore();
let form = null;
let list = new Map();
let availableSpots = "";
let maxSpots = 0;
let confirm = false;
let response = null;
let verified = false;
let rawEventsData = {maxSpots:1};
let serviceLength = 3600;
let current = null;
let currentValues = {};
let pollingData = null;
let mbscOptions = {
	theme: 'mobiscroll'
};
/*let timeOrder = (a: KeyValue<string,any>, b: KeyValue<string,any>): number => {
	if (a.value.time != b.value.time) {
		return a.value.time - b.value.time;
	}
}*/



db.collection("reservation").doc("settings")
.onSnapshot((doc) => {
	rawEventsData = doc.data();
	console.log(rawEventsData);
	parseEvents();
	processEvents();

});
db.collection("forms").doc("vo887dEdCz5hCQzbf5ns")
.onSnapshot((doc) => {
	currentValues = doc.data();
	console.log(currentValues);
	parseEvents();
	processEvents();
});


function parseEvents() {
	let current = new Date();
	const events = JSON.parse(JSON.stringify(rawEventsData));
	events.times.forEach(event => {
		// If event is disabled, don't add it to the list
		if (!event.disabled) {
			if (list.get(event.ID)) list.delete(event.ID);
			return;
		}

		event.time = new Date(event.time.seconds * 1000);
		event.end = new Date(event.time.getTime() + (3600 * 1000));

		// If event is already over, don't include it
		if (current > new Date(event.end.getTime())) {
			if (list.get(event.ID)) list.delete(event.ID);
			return;
		}

		let newdate = moment(event.time).format() + "_" + event.name;
		//if(form.value.ServiceTime && form.value.ServiceTime.ID == event.ID){
		//	if(document.getElementById('Count').value >= currentValues[newdate]) {form.value.Count = currentValues[newdate];}
		//}
		if(currentValues[newdate] <= 0) {
			event.hidden = true;
	//		if(form.value.ServiceTime && form.value.ServiceTime.ID == event.ID) resetServiceTime();
		}

		// Add event to list
		list.set(event.ID, event);
	});
	current = getNextEvent(current);
	console.log(current);
	console.log(list);
}
function resetServiceTime(){

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
	setServiceTime();
}
function getNextEvent(time) {
	console.log(list);
	if (list && list.size > 0) {
		let items = [...list.entries()].sort((a, b) => { return a[1].time.getTime() - b[1].time.getTime(); });
		return items[0][0];
	} else {
		return null;
	}
}
function setServiceTime(){
	select = document.getElementById('ServiceTime');
	let set = `<option disabled selected value></option>`;
	list.forEach((time, i) => {
		console.log(time.hidden, i);
		if(document.getElementById('Campus').value != "" && time.name.includes(document.getElementById('Campus').value)){
			set += `<option value='${time.ID}'>${(time.hidden) ? '(Full) ' : ''} ${time.service} - ${moment(time.time).format('MMM D, h:mm a')}</option>`
		}

	});
	console.log(set);
	select.innerHTML = set;
}
function getCount() {
/*	if(form.value.ServiceTime != null) {
		let newdate = moment(form.value.ServiceTime.time).format() + "_" + form.value.ServiceTime.name;
		maxSpots = (currentValues[newdate] <= rawEventsData.maxSpots) ? currentValues[newdate] : rawEventsData.maxSpots;
		let val: number;
		if (form.value.Campus == "CH") {
			val = rawEventsData.CHCapacity;
		} else if (form.value.Campus == "EP") {
			val = rawEventsData.EPCapacity;
		} else if (form.value.Campus == "Chapel") {
			val = rawEventsData.ChapelCapacity;
		}
		availableSpots = ((currentValues[newdate] / val * 100) < 6) ? currentValues[newdate] : Math.floor(currentValues[newdate] / val * 100) + "%";
	}*/
}


function submit(){
	console.log(document.getElementById('Name').value);
	console.log(document.getElementById('Email').value);
	console.log(document.getElementById('Campus').value);
	console.log(document.getElementById('ServiceTime').value);
	console.log(document.getElementById('Count').value);
}
