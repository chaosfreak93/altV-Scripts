/// <reference types="@altv/types-natives" />
Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            message: '',
        }
    },
    methods: {},
    mounted() {
    },
});
