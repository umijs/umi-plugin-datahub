'use strict';

const path = require('path');
const DataHub = require('macaca-datahub');
const pathToRegexp  = require('path-to-regexp');
const proxyMiddleware = require('http-proxy-middleware');
const yargs = require('yargs-parser');

function getMiddlewares(options) {
  const middlewares = [];

  // serve debugger-board.js
  if (options.showBoard) {
    const express = require('express');
    const staticDir = path.resolve(require.resolve('debugger-board'), '..', 'dist');

    middlewares.push(express.static(staticDir));
  }

  // generate middleware for each proxy path
  Object.keys(options.proxy).forEach(route => {
    const config = options.proxy[route];
    const protocol = config.protocol || options.protocol;
    const hostname = config.hostname || options.hostname;
    const port = config.port || options.port;
    const hub = config.hub || options.hub;
    const changeOrigin = config.changeOrigin || options.changeOrigin;
    const rewrite = config.rewrite || options.rewrite || '^/';
    const target = `${protocol}://${hostname}:${port}`;
    const regexp = pathToRegexp(route, null, { end: false });
    const proxy = proxyMiddleware({
      target,
      changeOrigin,
      logLevel: 'error',
      pathRewrite: {
        [rewrite]: `/data/${hub}/`,
      },
    });

    middlewares.push((req, res, next) => {
      if (regexp.exec(req.url)) {
        // proxy to datahub if path matched
        proxy(req, res, next);
      } else {
        // else do nothing
        next();
      }
    });
  });

  return middlewares;
}

module.exports = (api) => {
  const { logger: { debug } } = api;
  const datahubConfig = {
    port: 5678,
    hostname: '127.0.0.1',
    store: path.join(__dirname, 'data'),
    proxy: {},
    showBoard: false,
    protocol: 'http',
    hub: 'default',
    changeOrigin: false,
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
  
  if (!isBigfish || args.datahub) {
    // push datahub middlewares
    api.addMiddewares(() => getMiddlewares(datahubConfig));

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
