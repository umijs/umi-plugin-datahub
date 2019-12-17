const path = require('path');

module.exports = {
  plugins: [
    ['../../', {
      proxy: {
        '^/api': {
          hub: 'hubname',
        },
      },
      store: path.join(__dirname, 'data'),
    }],
  ],
}
