import axios from 'axios'
// 将 aioxs 封装为 vue 的插件
var myaxios = {}
// 挂载一个方法： install
myaxios.install = function (Vue) {
    // 设置统一的请求路径
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
    // 将 axios 挂载到 vue 构造器中
    Vue.prototype.$http = axios
}
export default myaxios