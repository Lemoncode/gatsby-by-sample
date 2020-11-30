# 01-hello-gatsby

In this sample we are going to start working with Gatsby.

We will start from previous example `00-start`:

```bash
npm install
```

- Since the goal of this project is working with Gatsby, React, Emotion JS and TypeScript, we are going to install all necessary libraries.

- Installing [gatsby](https://github.com/gatsbyjs/gatsby):

```bash
npm i gatsby -P
```

- Now, we can add the necessary npm scripts:

### ./package.json

```diff
...

  "main": "index.js",
- "scripts": {},
+ "scripts": {
+   "build": "gatsby build",
+   "start": "gatsby develop"
+ },
...
```

- Before run this example, we need to create an index page:

### ./src/pages/index.jsx

```javascript
import React from 'react';

const IndexPage = () => <div>Hello from Gatsby</div>;

export default IndexPage;
```

- Run `start`:

```bash
npm start

```

- It's not bad but we would like to work with TypeScript, import aliases, CSS in JS, etc. What do we need? We need to install plugins:

```bash
npm i gatsby-plugin-typescript gatsby-plugin-alias-imports gatsby-plugin-web-font-loader gatsby-plugin-manifest babel-preset-gatsby @emotion/babel-plugin -D
```

- We have to create a file [gatsby-config](https://www.gatsbyjs.org/docs/gatsby-config/) to configure all these plugins:

> NOTE: Search a [Gatsby plugin](https://www.gatsbyjs.org/plugins)

### ./gatsby-config.js

```javascript
const path = require('path');

module.exports = {
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          common: path.resolve(__dirname, 'src/common'),
          'common-app': path.resolve(__dirname, 'src/common-app'),
          core: path.resolve(__dirname, 'src/core'),
          layouts: path.resolve(__dirname, 'src/layouts'),
          pods: path.resolve(__dirname, 'src/pods'),
        },
      },
    },
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
  ],
};
```

- Add custom `.babelrc` file:

### ./.babelrc

```json
{
  "presets": ["babel-preset-gatsby"],
  "plugins": ["@emotion"]
}
```

- Now, we can RENAME the index page by `index.tsx`.

### ./src/index.tsx

```diff
import React from 'react';
+ import { css } from '@emotion/css';

+ const root = css`
+   background-color: tomato;
+   color: white;
+   font-size: 4rem;
+   font-family: 'Open Sans';
+   padding: 2rem;
+ `;

- const IndexPage = () => <div>Hello from Gatsby</div>;
+ const IndexPage = () => <div className={root}>Hello from Gatsby</div>;

export default IndexPage;

```

- So far so good but what about SEO? We can define all site metadata in same `gatsby-config` like:

### ./gatsby-config.js

```diff
const path = require('path');

module.exports = {
+ siteMetadata: {
+   title: 'Gatsby by sample',
+   description: 'Project to work with Gatsby',
+   author: 'Lemoncode',
+ },
  plugins: [
    'gatsby-plugin-typescript',
    ...
  ],
};

```

- How can we inject it to Gatsby pages? We are going to use [react-helmet](https://github.com/nfl/react-helmet):

```bash
npm i react-helmet -P
npm i @types/react-helmet gatsby-plugin-react-helmet -D
```

- Configure plugin:

### ./gatsby-config.js

```diff
...
  plugins: [
    ...
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
+   'gatsby-plugin-react-helmet',
  ],
};

```

- We want to add on each page the `siteMetadata` and some meta tags that belong to each page:

### ./src/common/components/seo.component.tsx

> Open GraphQL Server in `http://localhost:8000/___graphql`

```javascript
import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

interface Props {
  title: string;
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
}

const query = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

export const SEO: React.StatelessComponent<Props> = (props) => {
  const { description, lang, meta, keywords, title } = props;

  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: data.site.siteMetadata.author,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};
```

- Update barrel file:

### ./src/common/components/index.ts

```diff
export * from './app-bar';
export * from './footer';
+ export * from './seo.component';

```

- Update `index` page:

### ./src/pages/index.tsx

```diff
import React from 'react';
import { css } from '@emotion/css';
+ import { SEO } from 'common/components';

...

- const IndexPage = () => <div className={root}>Hello from Gatsby</div>;
+ const IndexPage = () => {
+   return (
+     <>
+       <SEO
+         title="Home"
+         keywords={[
+           'lemoncode',
+           'gatsby',
+           'gatsby by sample',
+           'frontent',
+           'ssr',
+         ]}
+       />
+       <div className={root}>Hello from Gatsby</div>
+     </>
+   );
+ };
...

```

- If we execute `build` command and search `Hello from Gatsby` we will see all static content ready to be rendered by Gatsby:

```bash
npm run build
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
