/// <reference types="@altv/types-natives" />
Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            channel: 1,
        }
    },
    methods: {
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
        }
    },
    mounted() {
    },
});
