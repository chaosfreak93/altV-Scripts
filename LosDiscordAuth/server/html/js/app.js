Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    mounted() {
        history.replaceState(null, '', window.location.pathname);
    },
});
