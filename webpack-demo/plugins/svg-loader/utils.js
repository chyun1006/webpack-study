function isElementNode(node) {
  return node.hasOwnProperty("tag");
}

function renderASTNode(h, ast) {
  if (isElementNode(ast)) {
    var children = [];
    if (ast.children) {
      children = ast.children.map(function (child) {
        return renderASTNode(h, child);
      });
    }
    return h(
      ast.tag,
      {
        attrs: ast.attrsMap,
      },
      children
    );
  } else {
    return ast.text;
  }
}
const svgComponent = function (svg) {
  var com = {
    render: function (h) {
      var scale = this.scale ? this.dimension : {};
      var svgAttrs = Object.assign(
        {},
        svg.attrsMap,
        { "aria-hidden": "true", fill: this.fill },
        scale,
        this.$attrs
      );
      return h(
        svg.tag,
        {
          attrs: svgAttrs,
          on: this.$listeners,
        },
        [this.$slots.default].concat(
          (svg.children || []).map(function (c) {
            return renderASTNode(h, c);
          })
        )
      );
    },
  };
  return com;
};

function minifyAst(node) {
  return recursiveMinify(node);
}

var isVueTemplateASTElement = function (node) {
  return node.hasOwnProperty("children");
};

function recursiveMinify(node) {
  if (!isVueTemplateASTElement(node)) {
    if (node.text.trim() === "") {
      return undefined;
    }
    return {
      text: node.text,
    };
  }
  var children = [];
  node.children.forEach(function (element) {
    var result = recursiveMinify(element);
    if (result) {
      children.push(result);
    }
  });
  var output = {
    tag: node.tag,
  };
  if (Object.keys(node.attrsMap).length > 0) {
    output.attrsMap = node.attrsMap;
  }
  if (children.length > 0) {
    output.children = children;
  }
  return output;
}

// exports.svgComponent = svgComponent;

module.exports = {
  svgComponent,
  minifyAst,
};
