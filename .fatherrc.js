export default [
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
