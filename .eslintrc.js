module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "max-len": ["error", { "code": 360 }],
    "no-unused-vars":"off",
    "no-unused-components":"off",
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
