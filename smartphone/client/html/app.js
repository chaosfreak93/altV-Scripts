Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#smartphone',
    data() {
        return {
			isCharging: false,
			isFlightMode: false,
			audioVolume: 0.25,
			channel: 1,
			audioCharge: new Audio('./audio/charge.mp3'),
			audioClick: new Audio('./audio/click.mp3'),
			noSound: ['appWeatherButton', 'appCalenderButton'],
			noAppScreen: ['appWeatherButton', 'appCalenderButton'],
			currentTime: null,
			date: null,
			homeScreenVisible: true,
			appScreenVisible: false,
			homeButtonVisible: false,
			appContacts: false,
			appRadio: false,
			appContactsOverviewVisible: false,
			appRadioOverviewVisible: false,
			appContactsEditVisible: false,
			contacts: '',
			searchQuery: '',
			contactId: '',
			contactName: '',
			contactPhone: ''
		};
    },
    methods: {
        updateSmartphone(data) {
			let batteryIcon = 'battery-empty';
			if (data.batteryPercent >= 25) batteryIcon = 'battery-quarter';
			if (data.batteryPercent >= 50) batteryIcon = 'battery-half';
			if (data.batteryPercent >= 75) batteryIcon = 'battery-three-quarters';
			if (data.batteryPercent >= 90) batteryIcon = 'battery-full';
			this.$refs.battery.setAttribute('class', 'fas fa-' + batteryIcon);
	
			this.currentTime = data.currentTime;

			this.$refs.appWeatherButton.setAttribute('class', 'app fas fa-' + data.weather);
	
			this.date = data.date;
		},
        toggleHomeScreen() {
			if (this.homeScreenVisible) {
				this.homeScreenVisible = false;
				this.appScreenVisible = true;
				this.homeButtonVisible = true;
			} else {
				this.homeScreenVisible = true;
				this.appScreenVisible = false;
				this.homeButtonVisible = false;
				this.appContacts = false;
				this.appRadio = false;
				this.appContactsOverviewVisible = false;
				this.appContactsEditVisible = false;
				this.appRadioOverviewVisible = false;
			}
		},
		updateChargeMode() {
			this.audioCharge.play();
			if (this.isCharging) {
				this.isCharging = false;
				$('#battery').css('color', '#FFF');
			} else {
				this.isCharging = true;
				$('#battery').css('color', 'rgb(110, 255, 128)');
			}
			alt.emit('smartphone:charge', this.isCharging);
		},
		updateAirplaneMode() {
			if (this.isFlightMode) {
				this.isFlightMode = false;
				$('#signal')
					.removeClass('fa-plane')
					.addClass('fa-signal');
			} else {
				this.isFlightMode = true;
				$('#signal')
					.removeClass('fa-signal')
					.addClass('fa-plane');
			}
			alt.emit('smartphone:flightmode', this.isFlightMode);
		},
		clickHomeButton() {
			this.audioClick.play();
			this.toggleHomeScreen();
		},
		appClick(event) {
			if (!this.noSound.includes(event.target.getAttribute('id'))) this.audioClick.play();
			if (!this.noAppScreen.includes(event.target.getAttribute('id')))
				this.toggleHomeScreen();
		},
		openRadioApp(event) {
			this.appRadio = true;
			this.appRadioOverviewVisible = true;
		},
		joinChannel() {
			this.channel = parseInt(this.channel + "");
			if (this.channel > 100) {
				this.channel = 100;
			}
			if (this.channel < 1) {
				this.channel = 1;
			}
			alt.emit("joinChannel", this.channel + "");
		},
		leaveChannel() {
			alt.emit("leaveChannel");
		},
		openContactsApp(event) {
			alt.emit('smartphone:contacts:request');
			this.appContacts = true;
			this.appContactsOverviewVisible = true;
		},
		openEditContacts(event) {
			this.showEditContact(
				event.target.getAttribute('data-id'),
				event.target.getAttribute('data-name'),
				event.target.getAttribute('data-phone'));
		},
		updateContact() {
			this.sendUpdateContact();
		},
		deleteContact(event) {
			alt.emit('smartphone:contacts:delete', this.contactId);
			this.hideEditContact(event);
		},
		showEditContact(id, name, phone) {
			this.contactId = id;
			this.contactName = name;
			this.contactPhone = phone;
			this.appContactsOverviewVisible = false;
			this.appContactsEditVisible = true;
		},
		hideEditContact(event) {
			this.contactId = '';
			this.contactName = '';
			this.contactPhone = '';
			this.appContactsEditVisible = false;
			this.searchQuery = '';
			this.appContactsOverviewVisible = true;
		},
		sendUpdateContact() {
			let newData = { id: this.contactId, name: this.contactName, phone: this.contactPhone };
			if (this.contactId && this.contactName && this.contactPhone) {
				alt.emit('smartphone:contacts:update', newData);
			}
		},
		receiveContacts(data) {
			this.contacts = data;
		}
    },
	computed: {
		appContactsSearch() {
			if (this.searchQuery) {
				return this.contacts.filter((item) => {
					return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
				});
			} else {
				return this.contacts;
			}
		}
	},
    mounted() {
        if ('alt' in window) {
			this.audioCharge.volume = this.audioVolume;
			this.audioClick.volume = this.audioVolume;
            alt.emit('smartphone:ready');

			alt.on('smartphone:update', (data) => {
				this.updateSmartphone(data);
			});
			alt.on('smartphone:contacts:receive', (data) => {
				this.receiveContacts(data);
			});
			alt.on('smartphone:hide', () => {
				this.$refs.smartphone.style.bottom = '-29vw';
				this.$refs.smartphone.style.opacity = '0.5';
			});
			alt.on('smartphone:show', () => {
				this.$refs.smartphone.style.bottom = '2vw';
				this.$refs.smartphone.style.opacity = '1';
			});
        }
    },
});

/**$(() => {
	// #region FUNK
	$('#appRadioButton').click(() => {
		$('#appRadioOverview').show();
	});

	$('#appRadioJoinChannel').click(() => {
		channel = parseInt($('#appRadioChannel').val() + "");
        if (channel > 100) {
            channel = 100;
        }
        if (channel < 1) {
            channel = 1;
        }
        if ('alt' in window) alt.emit("joinChannel", channel + "");
	});

	$('#appRadioLeaveChannel').click(() => {
		if ('alt' in window) alt.emit("leaveChannel");
	});
	// #endregion

	// #region KONTAKTE
	$('#appContactsSearch').on('keyup change', function() {
		let searchString = $(this)
			.val()
			.toLowerCase();
		if (searchString.length) {
			$('.contact').hide();
			$('.contact').each(function() {
				if (
					$(this)
						.text()
						.toLowerCase()
						.includes(searchString)
				)
					$(this).show();
			});
		} else {
			$('.contact').show();
		}
	});

	$('#appContactsButton').click(() => {
		if ('alt' in window) alt.emit('smartphone:contacts:request');
		$('#appContactsOverview').show();
	});

	$('#contactNewName').on('change, keyup', () => {
		sendUpdateContact();
	});

	$('#contactNewPhone').on('change, keyup', () => {
		sendUpdateContact();
	});

	$(document).on('click', '.contact', function() {
		showEditContact(
			$(this).attr('data-id'),
			$(this).attr('data-name'),
			$(this).attr('data-phone')
		);
	});

	$('#editContactHead').click(() => {
		hideEditContact();
	});

	$('#editContactDeleteButton').click(() => {
		let deleteId = $('#contactId').val();
		if ('alt' in window) alt.emit('smartphone:contacts:delete', deleteId);
		hideEditContact();
	});

	function showEditContact(id, name, phone) {
		$('#contactId').val(id);
		$('#contactNewName').val(name);
		$('#editContactName').text(name);
		$('#editContactLetter > span').text(name[0]);
		$('#contactNewPhone').val(phone);
		$('#appContactsOverview').hide();
		$('#appContactsEdit').show();
	}

	function hideEditContact() {
		$('#contactId').val('');
		$('#contactNewName').val('');
		$('#contactNewPhone').val('');
		$('#appContactsOverview').show();
		$('#appContactsEdit').hide();
		$('#appContactsSearch').val('');
		$('.contact').show();
	}

	function sendUpdateContact() {
		let contactId = $('#contactId').val();
		let contactName = $('#contactNewName').val();
		let contactPhone = $('#contactNewPhone').val();

		let newData = { id: contactId, name: contactName, phone: contactPhone };
		if (contactId && contactName && contactPhone) {
			if ('alt' in window)
				alt.emit('smartphone:contacts:update', newData);
			$('#editContactName').text(contactName);
		}
	}
	// #endregion
});**/
