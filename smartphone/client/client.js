/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as native from 'natives';

let webView = null;
let isVisible = false;
let controlAction = null;

let contacts = [
	{ id: 1, name: 'LSPD', phone: '110' },
	{ id: 2, name: 'Mosley`s Cars', phone: '111' },
	{ id: 3, name: 'LSMD', phone: '112' }
];

if (!webView) {
	webView = new alt.WebView('http://resource/client/html/smartphone.html');

	webView.on('smartphone:contacts:update', (newData) => {
		updateContact(newData);
	});

	webView.on('smartphone:ready', () => {
		updateData();
		sendContacts();
	});

	webView.on('smartphone:contacts:request', () => {
		sendContacts();
	});

	webView.on('smartphone:contacts:delete', (deleteId) => {
		deleteContact(deleteId);
	});

	webView.on('smartphone:charge', (isCharging) => {
		// do something here
	});

	webView.on('smartphone:flightmode', (isFlightMode) => {
		// do something here
	});

	webView.on("joinChannel", (channel) => {
		alt.emitServer("joinChannel", channel);
	});
	
	webView.on("leaveChannel", () => {
		alt.emitServer("leaveChannel");
	});
}

alt.on('toggleSmartphone', () => {
	if (!isVisible) {
		webView.emit('smartphone:show');
		alt.showCursor(true);
		controlAction = alt.everyTick(() => {
			native.disableControlAction(0, 24, true);
			native.disableControlAction(0, 25, true);
			native.disableControlAction(0, 37, true);
			native.disableControlAction(0, 68, true);
			native.disableControlAction(0, 69, true);
			native.disableControlAction(0, 70, true);
			native.disableControlAction(0, 91, true);
			native.disableControlAction(0, 92, true);
			native.disableControlAction(0, 114, true);
			native.disableControlAction(0, 142, true);
			native.disableControlAction(0, 199, true);
			native.disableControlAction(0, 200, true);
			native.disableControlAction(0, 257, true);
			native.disableControlAction(0, 270, true);
			native.disableControlAction(0, 271, true);
			native.disableControlAction(0, 272, true);
			native.disableControlAction(0, 273, true);
			native.disableControlAction(0, 331, true);
		});
		isVisible = true;
		webView.focus();
	} else {
		webView.emit('smartphone:hide');
		alt.showCursor(false);
		alt.clearEveryTick(controlAction);
		isVisible = false;
		webView.unfocus();
	}
});

function updateContact(newData) {
	const found = contacts.find((e) => e.id === parseInt(newData.id));
	if (found) {
		found.name = newData.name;
		found.phone = newData.phone;
		sendContacts();
	}
}

function deleteContact(deleteId) {
	const found = contacts.find((e) => e.id === parseInt(deleteId));
	if (found) {
		contacts.splice(contacts.indexOf(found), 1);
		sendContacts();
	}
}

function updateData() {
	const time = new Date(Date.now());
	let minutes = time.getMinutes();
	if (minutes <= 9) {
		minutes = "0" + minutes;
	}

	let hours = time.getHours();
	if (hours <= 9) {
		hours = "0" + hours;
	}

	let smartphoneData = {
		batteryPercent: 100,
		currentTime: hours + ':' + minutes,
		weather: 'sun', // wind, smog, cloud, sun, cloud-sun-rain, cloud-sun, cloud-showers-heavy, cloud-rain, snowflake
		date: time.getDate()
	};
	webView.emit('smartphone:update', smartphoneData);

	alt.setTimeout(() => {
		updateData();
	}, 1000);
}

function sendContacts() {
	webView.emit('smartphone:contacts:receive', contacts);
}
