export default [
  {
    cjs: 'babel',
    disableTypeCheck: true,
  },
  {
    entry: 'ui/index.jsx',
    disableTypeCheck: true,
    typescriptOpts: {
      check: false,
    },
    umd: {
      name: 'umi-plugin-datahub',
      minFile: false,
    },
  },
];
