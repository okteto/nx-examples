const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { merge } = require('webpack-merge');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, { options, context }) => {
    // Update the webpack config as needed here.
    // e.g. config.plugins.push(new MyPlugin())
    // For more information on webpack config and Nx see:
    // https://nx.dev/packages/webpack/documents/webpack-config-setup
    return merge(config, {
      devServer: {
        port: 8080,
        host: '0.0.0.0',
        hot: true,
        allowedHosts: 'all',
        client: {
          webSocketTransport: 'ws'
        },
        webSocketServer: 'ws',
        client: {
          webSocketURL: {
            port: 443
          },
        },
        watchFiles: {
          options: {
            usePolling: true,
          },
        }
      }
    })
  }
);
