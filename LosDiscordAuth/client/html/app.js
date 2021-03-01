/// <reference types="@altv/types-natives" />
Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            show: false,
            info: `Wir nutzen Discord und Socialclub zum speichern von Daten. Log dich daher bitte mit deinem Discord Konto ein! Wir nutzen dafür deinen Browser.`,
        };
    },
    methods: {
        setReady(url) {
            this.show = true;
            this.url = url;
        },
        beginAuth() {
            if (!this.url) {
                return;
            }

            this.show = false;
            window.open(this.url);
        },
    },
    mounted() {
        if ('alt' in window) {
            alt.on('discord:Ready', this.setReady);
            alt.emit('discord:Ready');
        } else {
            this.setReady();
        }
    },
});
