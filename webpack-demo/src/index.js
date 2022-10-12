//import { mul,add } from "./js/a";//webpack resolve的extensions,可以省略引入模块的扩展
import "./css/index.css";
require("./css/index.less");

import "./css/a.css";
import "./css/b.css";

import "./js/a";
import "./js/es6";

import html from "../readme.md";
import img from "./assets/cat.jpg";

console.log("--img--", img);

import SvgCom from "./assets/fly.svg";
Vue.component("SvgCom", SvgCom);

new Vue({
  data: {
    msg: "hello",
  },
  el: "#app",
});
//console.log('hello webpack', str)

//没有配置webpack resolve路径解析 之前引入bootstrap.css样式的写法
//import 'bootstrap/dist/css/bootstrap.css'

import "bootstrap";
import $ from "jQuery";
console.log($);

document.getElementById("lazyLoadBtn").onclick = function () {
  //console.log(add(1,1))

  //懒加载
  import(/* webpackChunkName:'aa'*/ "./js/a").then(res => {
    console.log(res);
    res.add(1, 2);
  });
};
