module.exports = {
  "extends": ["next/core-web-vitals", "plugin:storybook/recommended","prettier"],
  "plugins": ["@typescript-eslint", "no-null"],
  "rules": {
    "no-null/no-null": 0,
    "no-trailing-spaces":1,
    "indent": ["error", 2],
    "no-trailing-spaces": 1,
    "space-after-keywords": [0, "always"],
    "space-before-blocks": [0, "always"],
    "curly": ["error", "multi-line", "consistent"],
    "nonblock-statement-body-position": ["error", "beside"],
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    "import/no-anonymous-default-export": "off",
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],

    "react/display-name":"off"
  }
}
