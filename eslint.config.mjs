import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      'import/no-anonymous-default-export': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default config;
