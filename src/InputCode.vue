<template>
  <div class="vue_input_code">
    <div class="input" @click="focusInput" :style="{'height':height}">
      <div
          class="input-code"
          :class="{first: inputCodeNum===0, last: inputCodeNum === 6}"
          :style="{left: left, 'z-index': zIndex, 'height': height, 'width': blockSize - 1 + '%'}">
        <template v-if="type==='number'">
          <input
              ref="input_code"
              type="tel"
              :style="{'font-size': inputSize, 'color': inputColor}"
              @keyup="inputCodeEvent($event)"
              @blur="blurInput"
              v-model="inputCode"
              autofocus
              maxlength="1"
              @keyup.delete="deleteInput">
        </template>
        <template v-else>
          <input
              ref="input_code"
              type="text"
              :style="{'font-size': inputSize, 'color': inputColor}"
              @keyup="inputCodeEvent($event)"
              @blur="blurInput"
              v-model="inputCode"
              autofocus maxlength="1"
              @keyup.delete="deleteInput">
        </template>
      </div>
      <span
          v-for="(item,index) in block"
          :key="item"
          :style="{'font-size': spanSize, 'color': spanColor, 'height': height, 'line-height': height, 'width': blockWidth}"
          v-text="codeArray[index] ? codeArray[index] : ''"
          :class="{'first':index === 0, 'last': index === number - 1}"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //接收一个可以改变父组件的数据(引用类型才可以修改,所以这里是引用类型)
    code: {
      type: Array,
      default: () => [],
      required: true
    },
    //用户输入完成后的回调
    success: {
      type: Function,
      default: () => {
      }
    },
    //用户输入错误的时候调用的函数
    error: {
      type: Function,
      default: () => {
      }
    },
    customValidate: {
      type: Function,
      default: undefined
    },
    //每次输入都回调
    getInput: {
      type: Function,
      default: () => {
      }
    },
    // 显示字体大小
    spanSize: {
      type: String,
      default: "20px"
    },
    // 显示字体颜色
    spanColor: {
      type: String,
      default: "#f35252"
    },
    //输入框字体大小
    inputSize: {
      type: String,
      default: "20px"
    },
    //输入框字体颜色
    inputColor: {
      type: String,
      default: "#000"
    },
    height: {
      type: String,
      default: "40px"
    },
    //验证码个数
    number: {
      type: Number,
      default: 6,
    },
    //用户输入类型,有number,text
    type: {
      type: String,
      default: "number",
      validator: (value) => {
        return ['number', 'text'].indexOf(value) > -1;
      }
    },
    // 输入的字母是否需要大写
    upperCase: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputCodeNum: 0, //输入框的位置
      left: "0", //输入框距离左边的距离
      inputCode: "", //单次输入的值
      codeArray: [], //输入的值数组

      blockWidth: (100 / this.number).toFixed(4) + '%', //每个格子的宽度
      blockSize: (100 / this.number).toFixed(4), //计算用宽度
      block: [], //存放格子

      zIndex: 10 //输入框层级(开始默认最高)
    }
  },
  created() {
    for (let i = 0; i < this.number; i++) {
      this.block.push(i);//获取格子数并保持方便循环
    }
  },
  computed: {
    codeString() {
      let data = "";
      this.codeArray.map(item => {
        data += item;
      });
      return data;
    }
  },
  methods: {
    /** 删除输入 */
    deleteInput() {
      if (this.inputCodeNum === this.number - 1) {
        this.inputCodeNum--;
        this.left = (this.blockSize * this.inputCodeNum) + "%";
        this.codeArray.pop();
        this.code.pop();
        this.getInput(this.codeString);//回调
        return;
      }
      if (this.inputCodeNum !== 0) {
        this.inputCodeNum--;
        this.codeArray.pop();
        this.code.pop();
        this.left = (this.blockSize * this.inputCodeNum) + '%'
        this.getInput(this.codeString);//回调
      }
    },
    /** 每次输入的事件 */
    inputCodeEvent() {
      const checkFn = this.customValidate ? this.customValidate : this.isCodeCorrect
      const isCorrect = checkFn(this.inputCode)

      if (!isCorrect) {
        this.error(this.inputCode);
        this.inputCode = '';
        return;
      }

      if (this.upperCase) {
        this.inputCode = this.inputCode.toUpperCase();
      }

      if (this.inputCodeNum < this.number - 1) {
        this.codeArray.push(this.inputCode);
        this.code.push(this.inputCode);
        this.inputCode = '';
        this.inputCodeNum++;
        this.left = (this.blockSize * this.inputCodeNum) + '%';

        this.getInput(this.codeString);//回调
      } else {
        if (this.inputCodeNum === this.number - 1) {
          this.inputCodeNum++;
          this.codeArray.push(this.inputCode);
          this.code.push(this.inputCode);
          this.success(this.codeString);//输入完成后回调
          this.getInput(this.codeString);//回调
        }
      }
    },
    isCodeCorrect(code) {
      if (!code || code === ' ') {
        return false;
      }
      if (this.type === "number" && isNaN(Number(code))) {
        return false;
      }
      if (this.type === 'text') {
        return true;
      }

      return true;
    },
    /** 失去焦点 */
    blurInput() {
      this.zIndex = -10;
    },
    /** 获得焦点 */
    focusInput() {
      this.zIndex = 10;
      this.$refs.input_code.focus();
    }
  }
}
</script>

<style lang="scss">
@mixin display_flex($action) {
  @if $action=='column' {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } @else {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}

.vue_input_code {
  width: 100%;

  .input {
    width: 100%;
    position: relative;
    @include display_flex('row');

    > div {
      border: 1px solid #323232;
      font-weight: 900;
      background-color: white;

      &:nth-child(n) {
        border-right: none;
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-right: 1px solid #323232;
      }

      input {
        font-size: 20px;
        width: 90%;
        color: rgb(50, 50, 50);
        text-align: center;
        outline: none;
        border: none;
        margin-right: 5px;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      }
    }

    .input-code {
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 1%;
      border: none;
      background: none;
      @include display_flex("row");
    }

    > span {
      border: 1px solid #323232;
      font-weight: 900;
      background-color: white;
      display: inline-block;
      text-align: center;
      font-size: 20px;

      &:nth-child(n) {
        border-right: none;
      }

      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-right: 1px solid #323232;
      }
    }

    > span.first {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .input-code.first {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .input-code.last {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>