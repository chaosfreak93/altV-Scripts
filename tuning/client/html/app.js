var app = new Vue({
    el: '#app',
    data() {

        if ('alt' in window) {
            alt.on('CU::Mods:Load', (data, _name) => {this.vehicle_load(data, _name)})
        }

    return{
        name: ' ',
        mods: [
            {
                name: 'Test',
                value: 0,
                max_value: 10,
                show: false
            },
        ],
        menu_active: 0,
        menu: ['Car.svg']
    }
    },
    watch: {

    },
    methods: {

     language(){
            let lang = document.getElementById('lang_select').value
            let lang_array = ['Deu']
            if ('alt' in window) {
                alt.emit('CU::Lang:Return', lang_array.indexOf(lang))
            }
     },

    

    switch_menu(id){
        this.menu_active = id
        this.option_render(id)
    },

    vehicle_load(data, _name){
      this.name = _name
      this.mods = data
    this.option_render(0)
    },
    
    change_color(_type){
        let hex_color = document.getElementById(`color${_type}`).value;
        let pattern_color = "^#([A-Fa-f0-9]{8})$";
        if (hex_color.match(pattern_color)) {
            let color = hex_color.replace("#", "");
            let _r = parseInt(color.substring(0, 2), 16);
            let _g = parseInt(color.substring(2, 4), 16);
            let _b = parseInt(color.substring(4, 6), 16);
            let _a = parseInt(color.substring(6, 8), 16);
            if ('alt' in window) {
                alt.emit('CU::Color:Return', { type: _type, r: _r, g: _g, b: _b, a: _a })
            }
        }
    },

    option_render(id){
        let option = [
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,65],
    ] 

        
        this.mods.map((mod, index) => {
            if ([...option[id]].indexOf(index) == -1){
                mod.show = false
            } else mod.show = true;
        })
    },

    change_data(id, type){
        this.mods.map((mod, index) => {
            if (id === index){
                if (mod.value + type < 0 || mod.value + type > mod.max_value) return;
                mod.value += type
            }
        })

        if ('alt' in window) {
            alt.emit('CU::Mods:Return', this.mods)
        }
    }
    }
})
