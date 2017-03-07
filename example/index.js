import Vue from 'vue';
import VueInputCode from '../src/inputcode.vue';
// Vue.component('VueInputCode', VueInputCode);

new Vue({
	el:"#app",
	data:{
		code:[]
	},
	created(){
		
	},
	methods:{
		success(code){
			console.log(code)
		}
	},
	components:{
		VueInputCode
	}
})