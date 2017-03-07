# vue-input-code

## 基于Vue2.0的移动端验证码输入组件.

<img src="./example/code.png">

## 功能预览

+ 输入回调
+ 完成回调

## 支持

支持 Vue.js 2.0+.

不支持 Vue.js 1.x.

## 安装和使用

```javascript
npm install vue-input-code --save
```

- 作为全局组件使用

```javascript
//在项目入口文件
import Vue from 'vue'
import VueInputCode from 'vue-input-code'
Vue.component('VueInputCode', VueInputCode)
```

- 作为局部组件

```javascript
//在某个组件中
import VueInputCode from 'vue-input-code'
export default {
  components: {
    VueInputCode
  }
}
```

HTML中使用:

```html
<vue-input-code :code="code" :getinput="getInput" :success="success"></vue-input-code>
```

## API

### Props

| 参数    | 类型    | 说明   |  可选值 | 默认值 |
| ------------- |-------| -----| ----| -------|
| code | 数组 | 用户输入的验证码数组 | — | — |
| getinput | 函数 | 用户每次输入后的回调函数,接受一个字符串 | — | — |
| success | 函数 | 用户输入完成后的回调函数,接受一个字符串 | — | — |
