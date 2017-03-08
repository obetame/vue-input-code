import Vue from 'vue';
import VueInputCode from '../src/inputcode.vue';
// Vue.component('VueInputCode', VueInputCode);

new Vue({
	el:"#app",
	data:{
		code:[],
		codeString:"",
		input:""
	},
	created(){
		
	},
	methods:{
		success(code){
			this.codeString = code;
		},
		getInput(code){
			this.input = code;
		},
		error(){
			console.log("错误输入")
		}
	},
	components:{
		VueInputCode
	}
})