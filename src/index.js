import VueInputCode from './inputcode.vue';

if (typeof window !== 'undefined' && window.Vue) {
	Vue.component('vue-input-code', VueInputCode);
};

export default VueInputCode;
