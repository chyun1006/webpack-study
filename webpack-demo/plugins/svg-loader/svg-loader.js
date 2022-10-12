const vue_template_compiler = require("vue-template-compiler");

const { minifyAst } = require("./utils");
function compileAndMinify(code) {
  var compiledSvg = vue_template_compiler.compile(code);
  // console.log("\n --compiledSvg--", compiledSvg);
  if (compiledSvg.ast === undefined) {
    var errorMsg = "Unknown Error";
    if (compiledSvg.errors.length > 0) {
      errorMsg = compiledSvg.errors.join(",");
    }
    throw new Error(
      "There were one or more problems building the AST for the requested SVG: " +
        errorMsg
    );
  }
  return minifyAst(compiledSvg.ast);
}

module.exports = source => {
  console.log('svg loader')
  const res =
    "\n  import { svgComponent } from '../../plugins/svg-loader/utils.js' \n   export default svgComponent(" +
    JSON.stringify(compileAndMinify(source), null, 2) +
    ")\n  ";
  return res;
};
