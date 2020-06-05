'use strict';

const path = require('path');
const DataHub = require('macaca-datahub');
const { getProxyMiddlewares }  = require('datahub-proxy-middleware');
const yargs = require('yargs-parser');

module.exports = (api) => {
  const { logger: { debug } } = api;
  const datahubConfig = {
    port: 5678,
    hostname: '127.0.0.1',
    store: path.join(__dirname, 'data'),
    proxy: {},
    showBoard: false,
    ...api.userConfig.datahub,
  };
  const isBigfish = Boolean(process.env.BIGFISH_VERSION);
  const args = yargs(process.argv.slice(2));

  const defaultDatahub = new DataHub({
    port: datahubConfig.port,
  });

  debug('datahubConfig');
  debug(datahubConfig);

  // add datahub config field
  api.describe({
    key: 'datahub',
    config: {
      default: {},
      schema(joi) {
        return joi.object();
      },
    },
  });

  if ((!isBigfish || args.datahub) && process.env.NODE_ENV === 'development') {
    // push datahub middlewares
    api.addMiddewares(() => getProxyMiddlewares(datahubConfig));

    // start datahub server
    api.onStart(() => {
      defaultDatahub.startServer(datahubConfig).then(() => {
        debug('datahub ready');
        console.log('datahub ready');
      });
    });

    // add debugger-board.js into template
    if (datahubConfig.showBoard) {
      api.addHTMLScripts(() => ([
        { src: '/debugger-board.js' },
        {
          content: `
  window._debugger_board_datahub_options = ${JSON.stringify(datahubConfig)};
  window._debugger_board.append(document.body);`
        }
      ]));
    }

    // TODO: add UI
    // api.onUISocket(({ action, success }) => {
    //   const { type } = action;
    //   switch (type) {
    //     case 'org.umi.datahub.getPort': {
    //       success({ port: datahubConfig.port });
    //       break;
    //     }
    //     default:
    //       break;
    //   }
    // });

    // api.addUIPlugin(require.resolve('./dist/index.umd'));
  }
};
