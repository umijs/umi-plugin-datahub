'use strict';

const path = require('path');
const DataHub = require('macaca-datahub');
const datahubMiddleware = require('datahub-proxy-middleware');
const yargs = require('yargs-parser');

module.exports = (api, opts = {}) => {
  const { debug } = api;
  const datahubConfig = {
    port: 5678,
    hostname: '127.0.0.1',
    store: path.join(__dirname, 'data'),
    proxy: {},
    showBoard: false,
    ...opts,
  };
  const isBigfish = Boolean(process.env.BIGFISH_VERSION);
  const args = yargs(process.argv.slice(2));

  const defaultDatahub = new DataHub({
    port: datahubConfig.port,
  });

  debug('datahubConfig');
  debug(datahubConfig);

  // register datahub args for dev command if integrated in Bigfish
  if (isBigfish) {
    api._modifyHelpInfo(memo => {
      memo.commands.dev.opts.options = {
        ...(memo.commands.dev.opts.options || {}),
        '--datahub': 'start dev server & datahub server at the same time',
      };

      return memo;
    });
  }

  if (!isBigfish || args.datahub) {
    api._beforeServerWithApp(({ app }) => {
      datahubMiddleware(app)(datahubConfig);
      defaultDatahub.startServer(datahubConfig).then(() => {
        debug('datahub ready');
        console.log('datahub ready');
      });
    });
  }
};
