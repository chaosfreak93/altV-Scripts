Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            info: `Einloggen erfolgreich. Du kannst das Fenster jetzt schließen. Viel Spaß im RP!`,
        };
    },
    mounted() {
        window.history.replaceState(null, null, window.location.pathname);
    },
});
