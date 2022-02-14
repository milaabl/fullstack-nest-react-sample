module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      createDefaultProgram: true,
    },
    env: {
      browser: true,
      jest: true
    },
    plugins: ['@typescript-eslint', 'react', 'import', '@ionic'],
    extends: [
      'airbnb-typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:@ionic/recommended',
      'plugin:react/recommended',
    ],
    globals: {
        'test': 'readonly',
        'expect': 'readonly'
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-useless-constructor': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'arrow-parens': 'off',
      'no-shadow': 'off',
      'import/no-named-as-default': 0,
      '@typescript-eslint/ban-ts-comment': 'off',
      'linebreak-style': 'off',
      'import/no-extraneous-dependencies': ['error',  {'devDependencies': true}],
      'react/jsx-props-no-spreading': 'off',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',  
      'max-len': [
        'error',
        {
          ignoreComments: true,
          code: 170,
        }
      ],
      'react/jsx-closing-bracket-location': [1, 'after-props'],
      'react/require-default-props': 'off',
      'no-case-declarations': 'off',
      'no-useless-return': 'off',
      'arrow-body-style': 'off',
      'jsx-a11y/label-has-associated-control': [ 'error', {
        'required': {
          'some': [ 'nesting', 'id'  ]
        }
      }],
      'jsx-a11y/label-has-for': [ 'error', {
        'required': {
          'some': [ 'nesting', 'id'  ]
        }
      }]
    },
  };
