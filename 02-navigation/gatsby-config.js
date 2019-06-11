const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Gatsby by sample',
    description: 'Project to work with Gatsby',
    author: 'Lemoncode',
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          common: path.resolve(__dirname, 'src/common'),
          'common-app': path.resolve(__dirname, 'src/common-app'),
          core: path.resolve(__dirname, 'src/core'),
          layout: path.resolve(__dirname, 'src/layout'),
          pods: path.resolve(__dirname, 'src/pods'),
        },
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open Sans:300,400,800'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby by sample',
        short_name: 'Lemoncode-Gatsby',
        start_url: '/',
        background_color: '#f5f7fb',
        theme_color: '#d9d900',
        display: 'fullscreen',
        icon: 'src/core/images/favicon.png',
      },
    },
    'gatsby-plugin-react-helmet',
  ],
};