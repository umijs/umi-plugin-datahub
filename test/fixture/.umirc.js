const path = require('path');

module.exports = {
  plugins: ['../../'],
  datahub: {
    proxy: {
      '^/api': {
        hub: 'hubname',
      },
    },
    store: path.join(__dirname, 'data'),
  },
}
