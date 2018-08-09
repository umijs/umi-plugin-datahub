const path = require('path');
const DataHub = require('macaca-datahub');
const datahubMiddleware = require('datahub-proxy-middleware');

module.exports = (api, opts = {}) => {
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

  api.register('beforeServerWithApp', ({ args: { app } }) => {
    datahubMiddleware(app)(datahubConfig);
    defaultDatahub.startServer(datahubConfig).then(() => {
      console.log('datahub ready');
    });
  });
};
