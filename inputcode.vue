<template type="x/template">
	<div id="vue_input_code">
		<div class="input">
      <div :class="{'input-code':true,first:inputCodeNum===0,last:inputCodeNum===6}" :style="{left:left}">
        <input type="tel" @keyup="inputCodeEvent($event)" v-model="inputCode" autofocus maxlength="1" @keyup.delete="deleteInput" name="input1">
      </div>
      <span :style="{'border-left':inputCodeNum===0?'none':''}" v-text="codeArray[0]?codeArray[0]:''" class="first"></span>
      <span :style="{'border-left':inputCodeNum===1?'none':''}" v-text="codeArray[1]?codeArray[1]:''"></span>
      <span :style="{'border-left':inputCodeNum===2?'none':''}" v-text="codeArray[2]?codeArray[2]:''"></span>
      <span :style="{'border-left':inputCodeNum===3?'none':''}" v-text="codeArray[3]?codeArray[3]:''"></span>
      <span :style="{'border-left':inputCodeNum===4?'none':''}" v-text="codeArray[4]?codeArray[4]:''"></span>
      <span :style="{'border-left':inputCodeNum===5?'none':''}" class="last" v-text="codeArray[5]?codeArray[5]:''"></span>
    </div>
	</div>
</template>

<script type="text/babel">
export default {
	props:{
		code:{
			type:Array,
			default:function(){
				return []
			},
			required:true
		},//接收一个可以改变父组件的数据(引用类型才可以修改,所以这里是引用类型)
		success:{
			type:Function,
			default:function(){}
		},//用户输入完成后的回调
		getinput:{
			type:Function,
			default:function(){}
		},//每次输入都回调
	},
	data () {
		return {
			inputCodeNum:0,//输入框的位置
			left:"0",//输入框距离左边的距离
			inputCode:"",//单次输入的值
			codeArray:[],//输入的值数组
		}
	},
	created(){
		
	},
	filters:{
		
	},
	watch:{
		
	},
	computed:{
		codeString(){
			let data = "";
			this.codeArray.map(item=>{
				data+=item;
			});
			return data;
		}
	},
	methods:{
		/** 删除输入 */
		deleteInput(){
			if(this.inputCodeNum===5){
				this.inputCodeNum--;
				let n = 16.6666*(this.inputCodeNum);
				this.left = n+"%";
				this.codeArray.pop();
				this.code.pop();
				return;
			}
			if(this.inputCodeNum!==0){
				this.inputCodeNum--;
				this.codeArray.pop();
				this.code.pop();
				let n = 16.5666*(this.inputCodeNum);
				this.left = n+"%";
			}
		},
		/** 每次输入的事件 */
		inputCodeEvent(event){
			if(event.keyCode>=48&&event.keyCode<=57){
				let code = event.target.value;//code
				
				if(this.inputCodeNum<5){
					this.codeArray.push(code);
					this.code.push(code);
					this.inputCode = "";
					this.inputCodeNum++;
					let n = 16.5666*this.inputCodeNum
					this.left = n+"%";

					this.getinput(this.codeString);//回调
				}
				else{
					if(this.inputCodeNum===5){
						this.inputCodeNum++;
						this.codeArray.push(code);
						this.code.push(code);
						this.success(this.codeString);//输入完成后回调
						this.getinput(this.codeString);//回调
					}
				}
			}
		},
	}
}
</script>

<style lang="css">
@import "./dist/inputcode.css";
</style>