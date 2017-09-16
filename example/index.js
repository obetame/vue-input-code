import Vue from 'vue';
import VueInputCode from '../src/inputcode.vue';
// Vue.component('VueInputCode', VueInputCode);

new Vue({
	el:"#app",
	data:{
		code:[],
		code1:[],
		code2:[],
		code3:[],
		code4:[],
		code5:[],
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
		error(code){
			console.log("错误输入:", code)
		}
	},
	components:{
		VueInputCode
	}
})