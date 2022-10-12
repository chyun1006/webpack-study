let marked = require("marked");
let loaderUtils= require("loader-utils");

// module.exports = (source)=>{
//     console.log(source)
//     return 'console.log("hello loader")'
// }

module.exports = source => {
  console.log("--------------");
  console.log("--getOptions--", loaderUtils.getOptions(this));

  let html = marked(source);
  let code = `export default ${JSON.stringify(html)}`;
  return code;
};

//1、loader 的返回值必须是一个js 代码字符串

//2、或者使用其他的loader来接着处理我们这里得到的结果
