# 03-handling-images

In this sample we will config all necessary plugins to work with images.

We will start from previous example `02-navigation`:

```bash
npm install
```

- Now, we want to add the `core/images/home-logo.png`:

### ./src/pods/home/home.component.tsx

```diff
import * as React from 'react';
import { Link } from 'gatsby';
import { routes } from 'core/routes';
import * as s from './home.styles';
+ const logo = require('core/images/home-logo.png');

export const Home: React.FunctionComponent = () => (
  <s.Container>
    <s.Title>Welcome to this website</s.Title>
-   <s.Title>(Image here)</s.Title>
+   <img src={logo} />
    <s.Subtitle>
      Check out our <Link to={routes.blog}>blog</Link>
    </s.Subtitle>
  </s.Container>
);
```

- Issues related with approach:
    - The size needed for the design.
    - We don't need larger image sizes for smartphones or tables, only for desktop.
    - Render images is slow for initial page load.

- So, we are going to use [gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image) library along with `gatsby-transformer-sharp`, `gatsby-plugin-sharp` and `gatsby-source-filesystem`:

```bash
npm i gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp gatsby-source-filesystem -P
```

- Update `gatsby-config`:

### ./gatsby-config.js

```diff
const path = require('path');

module.exports = {
  ...
  plugins: [
    ...
    'gatsby-plugin-react-helmet',
+   'gatsby-transformer-sharp',
+   'gatsby-plugin-sharp',
+   {
+     resolve: 'gatsby-source-filesystem',
+     options: {
+       name: 'images',
+       path: path.resolve(__dirname, 'src/core/images'),
+     },
+   },
  ],
};

```

- Using `gatsby-image`:

### ./src/pods/home/home.component.tsx

```diff
import * as React from 'react';
+ import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { routes } from 'core/routes';
import * as s from './home.styles';
- const logo = require('core/images/home-logo.png');

export const Home: React.FunctionComponent = () => (
  <s.Container>
    <s.Title>Welcome to this website</s.Title>
-   <img src={logo} />
+   <Img fixed={...} />
    <s.Subtitle>
      Check out our <Link to={routes.blog}>blog</Link>
    </s.Subtitle>
  </s.Container>
);

```

- How can we get image src? How it works?. We can take a look to: `http://localhost:8000/___graphql`:

```graphql
query {
  homeLogo: file(relativePath: {eq: "home-logo.png"}) {
    childImageSharp {
      fixed {
        base64
        originalName
      }
    }
  }
}

```

- Use it in `home` component. If we want to get all properties, gatsby has a special keyword or [fragments](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image#fragments) to get it::

### ./src/pods/home/home.component.tsx

```diff
import * as React from 'react';
import Img from 'gatsby-image';
- import { Link } from 'gatsby';
+ import { Link, StaticQuery, graphql } from 'gatsby';
import { routes } from 'core/routes';
import * as s from './home.styles';

+ const query = graphql`
+   query {
+     homeLogo: file(relativePath: { eq: "home-logo.png" }) {
+       childImageSharp {
+         fixed {
+           ...GatsbyImageSharpFixed
+         }
+       }
+     }
+   }
+ `;

export const Home: React.FunctionComponent = () => (
+ <StaticQuery
+   query={query}
+   render={({ homeLogo }) => (
      <s.Container>
        <s.Title>Welcome to this website</s.Title>
-       <Img fixed={...} />
+       <Img fixed={homeLogo.childImageSharp.fixed} />
        <s.Subtitle>
          Check out our <Link to={routes.blog}>blog</Link>
        </s.Subtitle>
      </s.Container>
+   )}
+ />
);

```

- It load an image resized to `400x400`. If we want to get image size by `screen size`, we have to use `fluid` instead:

> NOTE: Show `Network tab`, `disable cache` in chrome dev tools and `srcset`
> [srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

### ./src/pods/home/home.component.tsx

```diff
...

const query = graphql`
  query {
    homeLogo: file(relativePath: { eq: "home-logo.png" }) {
      childImageSharp {
-       fixed {
+       fluid(maxWidth: 1000) {
-         ...GatsbyImageSharpFixed
+          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export const Home: React.FunctionComponent = () => (
  <StaticQuery
    query={query}
    render={({ homeLogo }) => (
      <s.Container>
        <s.Title>Welcome to this website</s.Title>
+       <s.ImageContainer>
-         <Img fixed={homeLogo.childImageSharp.fixed} />
+         <Img fluid={homeLogo.childImageSharp.fluid} />
+       </s.ImageContainer>
        <s.Subtitle>
          Check out our <Link to={routes.blog}>blog</Link>
        </s.Subtitle>
      </s.Container>
    )}
  />
);

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
