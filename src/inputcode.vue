<template type="x/template">
	<div id="vue_input_code">
		<div class="input" @click="focusInput" :style="{'height':height}">
      <div :class="{'input-code':true,first:inputCodeNum===0,last:inputCodeNum===6}" :style="{left:left,'z-index':zIndex,'height':height,'width':blockSize-1+'%'}">
        <input ref="input_code" type="tel" :style="{'font-size':inputSize,'color':inputColor}" @keyup="inputCodeEvent($event)" @blur="blurInput" v-model="inputCode" autofocus maxlength="1" @keyup.delete="deleteInput">
      </div>
      <span v-for="(item,index) in block" :style="{'font-size':spanSize,'color':spanColor,'height':height,'line-height':height,'width':blockWidth}" v-text="codeArray[index]?codeArray[index]:''" :class="{'first':index===0,'last':index===number-1}"></span>
      <!-- <span :style="{'font-size':spanSize,'color':spanColor,'height':height,'line-height':height}" v-text="codeArray[1]?codeArray[1]:''"></span>
      <span :style="{'font-size':spanSize,'color':spanColor,'height':height,'line-height':height}" v-text="codeArray[2]?codeArray[2]:''"></span>
      <span :style="{'font-size':spanSize,'color':spanColor,'height':height,'line-height':height}" v-text="codeArray[3]?codeArray[3]:''"></span>
      <span :style="{'font-size':spanSize,'color':spanColor,'height':height,'line-height':height}" v-text="codeArray[4]?codeArray[4]:''"></span>
      <span :style="{'font-size':spanSize,'color':spanColor,'height':height,'line-height':height}" class="last" v-text="codeArray[5]?codeArray[5]:''"></span> -->
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
		error:{
			type:Function,
			default:function(){}
		},//用户输入了不是数字的时候调用的函数
		getinput:{
			type:Function,
			default:function(){}
		},//每次输入都回调
		spanSize:{
			type:String,
			default:"20px"
		},// 显示字体大小
		spanColor:{
			type:String,
			default:"#f35252"
		},// 显示字体颜色
		inputSize:{
			type:String,
			default:"20px"
		},//输入框字体大小
		inputColor:{
			type:String,
			default:"#000"
		},//输入框字体颜色
		height:{
			type:String,
			default:"40px"
		},
		number:{
			type:Number,
			default:6
		},//验证码个数
	},
	data () {
		return {
			inputCodeNum:0,//输入框的位置
			left:"0",//输入框距离左边的距离
			inputCode:"",//单次输入的值
			codeArray:[],//输入的值数组

			blockWidth:(100/this.number).toFixed(4)+'%',//每个格子的宽度
			blockSize:(100/this.number).toFixed(4),//计算用宽度
			block:[],//存放格子

			zIndex:10,//输入框层级(开始默认最高)
		}
	},
	created(){
		let block = [];
		for(let i=0;i<this.number;i++){
			block.push(i);
		}
		this.block = block;//获取格子数并保持方便循环
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
				let n = this.blockSize*(this.inputCodeNum);
				this.left = n+"%";
				this.codeArray.pop();
				this.code.pop();
				this.getinput(this.codeString);//回调
				return;
			}
			if(this.inputCodeNum!==0){
				this.inputCodeNum--;
				this.codeArray.pop();
				this.code.pop();
				let n = this.blockSize*(this.inputCodeNum);
				this.left = n+"%";
				this.getinput(this.codeString);//回调
			}
		},
		/** 每次输入的事件 */
		inputCodeEvent(event){
			/** 数字 */
			if(event.keyCode>=48&&event.keyCode<=57){
				let code = event.target.value;//code
				
				if(this.inputCodeNum<this.number-1){
					this.codeArray.push(code);
					this.code.push(code);
					this.inputCode = "";
					this.inputCodeNum++;
					let n = this.blockSize*this.inputCodeNum
					this.left = n+"%";

					this.getinput(this.codeString);//回调
				}
				else{
					if(this.inputCodeNum===this.number-1){
						this.inputCodeNum++;
						this.codeArray.push(code);
						this.code.push(code);
						this.success(this.codeString);//输入完成后回调
						this.getinput(this.codeString);//回调
					}
				}
			}
			/** 字母 */
			if(event.keyCode>=65&&event.keyCode<=81){
				this.error();//调用用户的错误处理函数
				this.inputCode = "";
			}
		},
		/** 失去焦点 */
		blurInput(){
			this.zIndex = -10;
		},
		/** 获得焦点 */
		focusInput(){
			this.zIndex = 10;
			this.$refs.input_code.focus();
		}
	}
}
</script>

<style lang="css">
@import "../dist/inputcode.css";
</style>