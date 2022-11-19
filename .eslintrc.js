module.exports = {
    "env": {
      "node": true,
      "es2021": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "overrides": [
      {
        "files": ["*.ts"], // Your TypeScript files extension
        "parserOptions": {
          "project": ["./tsconfig.json"], // Specify it only for TypeScript files,
          "tsconfigRootDir": __dirname,
        }
      }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "@typescript-eslint",
      "unused-imports"
    ],
    "ignorePatterns": ["/src/tests/*.ts","/src/tests/**/*.ts"],
    "rules": {
      "no-debugger":2, /** 0 = off, 1 = warn, 2 = error */
      "no-console": 0, /** 0 = off, 1 = warn, 2 = error */
      "comma-dangle": ["error", "always-multiline"],
      "indent": ["error", 2],
      "linebreak-style": ["error", "windows"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access":"off",
      "linebreak-style": 0,
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
      ]
    }
}