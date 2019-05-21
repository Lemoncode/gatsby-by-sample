require('dotenv').config();
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Gatsby by sample',
    description: 'Project to work with Gatsby',
    author: 'Lemoncode',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          common: path.resolve(__dirname, 'src/common'),
          core: path.resolve(__dirname, 'src/core'),
          layout: path.resolve(__dirname, 'src/layout'),
          pods: path.resolve(__dirname, 'src/pods'),
        },
      },
    },
    'gatsby-plugin-emotion', // To work with emotion-js and SSR
    {
      // To work with PWA
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Gatsby by sample',
        short_name: 'Lemoncode-Gatsby',
        start_url: '/',
        background_color: '#f5f7fb', //TODO
        theme_color: '#d9d900',
        display: 'fullscreen',
        icon: 'src/core/images/favicon.png',
      },
    },
    'gatsby-plugin-react-helmet', // To update html <head>
    'gatsby-plugin-sharp', // Used by gatsby-transformer-sharp
    'gatsby-plugin-typescript', // To work with Typescript
    {
      // To load fonts
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open Sans:300,400,800'],
        },
      },
    },
    // {
    //   // To load contentful account
    //   resolve: 'gatsby-source-contentful',
    //   options: {
    //     spaceId: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    //   },
    // },
    {
      // To load images
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src/core/images'),
      },
    },
    // Render Contentful markdown from string to HTML
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images-contentful',
          },
        ],
      },
    },
    'gatsby-transformer-sharp', // To process images
  ],
};
