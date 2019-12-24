import * as path from 'path';
import DataHub from 'macaca-datahub';
import datahubMiddleware from 'datahub-proxy-middleware';

export default (api, opts = {}) => {
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

  api.onUISocket(({ action, failure, success, send }) => {
    const { type, payload = {}, lang } = action;
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