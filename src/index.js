const path = require('path');
const DataHub = require('macaca-datahub');
const datahubMiddleware = require('datahub-proxy-middleware');

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

  const defaultDatahub = new DataHub({
    port: datahubConfig.port,
  });


  debug('datahubConfig');
  debug(datahubConfig);
  api._beforeServerWithApp(({ app }) => {
    datahubMiddleware(app)(datahubConfig);
    defaultDatahub.startServer(datahubConfig).then(() => {
      debug('datahub ready');
      console.log('datahub ready');
    });
  });

  api.onUISocket(({ action, success }) => {
    const { type } = action;
    switch (type) {
      case 'org.umi.datahub.getPort': {
        success({ port: datahubConfig.port });
        break;
      }
      default:
        break;
    }
  });

  // add UI
  api.addUIPlugin(require.resolve('../dist/index.umd'));
};
