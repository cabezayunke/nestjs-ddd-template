module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json', './apps/*/tsconfig.app.json', './libs/*/tsconfig.lib.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/internal-regex": "^@",
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        "alias": {
            "@shared": "./libs/shared/src",
            "@context/users": "./libs/users/src",
            "@cli": "./apps/cli/src",
            "@core-api": "./apps/core-api/src",
        },
        "extensions": [".ts"],
    }
    }
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      "error",
      { "allowExpressions": true }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "max-len": ["warn", { "code": 120 }],
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "no-console": "error"
  },
};
