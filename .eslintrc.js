module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "prettier",
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // 必须要加jsdoc
    "require-jsdoc": [
      "error",
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ["./router.js"],
      rules: {
        "valid-jsdoc": 2,
        // 不能有没用的属性
        "no-unused-vars": [
          "error",
          { vars: "all", args: "after-used", ignoreRestSiblings: false },
        ],
      },
    },
  ],
};
