'use strict';
import * as path from 'path';
import { IApi } from 'umi-types';
import DataHub from 'macaca-datahub';
import datahubMiddleware from 'datahub-proxy-middleware';

export default (api: IApi, opts = {}) => {
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

  // add UI
  api.addUIPlugin(require.resolve('../dist/index.umd'));
};
