const path = require('path');

export default {
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
