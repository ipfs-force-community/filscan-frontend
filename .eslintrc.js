module.exports = {
  "extends": [
    "next/core-web-vitals",
     "plugin:storybook/recommended",
     "prettier",
     "plugin:import/recommended",
     "plugin:prettier/recommended",
    ],
  "plugins": ["@typescript-eslint", "no-null"],
  "ignorePatterns": ["*.js", "**/leecharts/*.js"],
  "rules": {
    "no-null/no-null": 0,
    "no-trailing-spaces":1,
    "no-trailing-spaces": 1,
    "space-after-keywords": [0, "always"],
    "space-before-blocks": [0, "always"],
    "curly": ["error", "multi-line", "consistent"],
    "nonblock-statement-body-position": ["error", "beside"],
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    "import/no-anonymous-default-export": "off",
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
    "react/display-name":"off",
    "import/named":"off",
    "nonblock-statement-body-position":"off"
  }
}
