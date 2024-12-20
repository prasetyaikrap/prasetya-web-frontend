module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:react/recommended",
    "plugin:import/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules/*"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "simple-import-sort",
    "import",
    "prettier",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "block-scoped-var": "error",
    eqeqeq: ["error", "smart"],
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "no-console": "warn",
    "no-duplicate-imports": "error",
    "no-empty": "error",
    "no-extra-boolean-cast": "error",
    "no-redeclare": "error",
    "no-undef": "error",
    "no-unreachable": "error",
    "no-unused-vars": "off",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["error", { object: true, array: false }],
    "quote-props": ["error", "as-needed"],
    "spaced-comment": ["error", "always", { markers: ["/"] }],

    // Typescript
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",

    // Simple Import
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/named": "off",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-unresolved": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
