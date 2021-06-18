# 03-handling-images

In this sample we will config all necessary plugins to work with images.

We will start from previous example `02-navigation`:

```bash
npm install
```

- Now, we want to add the `core/images/home-logo.png`:

### ./src/pods/home/home.component.tsx

```diff
import React from 'react';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { routes } from 'core/routes';
+ import logo from 'core/images/home-logo.png';
import * as classes from './home.styles';

export const Home: React.FunctionComponent = () => {
  return (
    <div className={classes.root}>
      <Typography variant="h1">Welcome to this website</Typography>
-     <Typography variant="h1">(Image here)</Typography>
+     <img src={logo} />
      <Typography variant="h2">
        Check out our <Link to={routes.blog}>blog</Link>
      </Typography>
    </div>
  );
};

```

- Issues related with approach:
    - The size needed for the design.
    - We don't need larger image sizes for smartphones or tables, only for desktop.
    - Render images is slow for initial page load.

- So, we are going to use [gatsby-plugin-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image) library along with `gatsby-transformer-sharp`, `gatsby-plugin-sharp` and `gatsby-source-filesystem`:

```bash
npm i gatsby-plugin-image -P
npm i gatsby-transformer-sharp gatsby-plugin-sharp gatsby-source-filesystem -D
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
+   'gatsby-plugin-image',
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
import React from 'react';
+ import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { routes } from 'core/routes';
- import logo from 'core/images/home-logo.png';
import * as classes from './home.styles';

export const Home: React.FunctionComponent = () => {
  return (
    <div className={classes.root}>
      <Typography variant="h1">Welcome to this website</Typography>
-     <img src={logo} />
+     <StaticImage
+       src="../../core/images/home-logo.png"
+       alt="Lemoncode logo"
+       placeholder="blurred"
+       layout="fixed"
+       width={400}
+       height={400}
+     />
      <Typography variant="h2">
        Check out our <Link to={routes.blog}>blog</Link>
      </Typography>
    </div>
  );
};

```

> [StaticImage vs GatsbyImage](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image#deciding-which-component-to-use)

- Or we could use another component for dynamic images:



### ./src/pods/home/home.component.tsx

```diff
import React from 'react';
- import { StaticImage } from 'gatsby-plugin-image';
+ import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { routes } from 'core/routes';
import * as classes from './home.styles';

export const Home: React.FunctionComponent = () => {
  return (
    <div className={classes.root}>
      <Typography variant="h1">Welcome to this website</Typography>
-     <StaticImage
-       src="../../core/images/home-logo.png"
-       alt="Lemoncode logo"
-       placeholder="blurred"
-       layout="fixed"
-       width={400}
-       height={400}
-     />
      <Typography variant="h2">
        Check out our <Link to={routes.blog}>blog</Link>
      </Typography>
    </div>
  );
};

```

- How can we get image src? How it works?. We can take a look to: `http://localhost:8000/___graphql`:

```graphql
query {
  homeLogo: file(relativePath: {eq: "home-logo.png"}) {
    childImageSharp {
      gatsbyImageData(layout:FIXED, placeholder: BLURRED)
    }
  }
}

```

- Use it in `home` component:

### ./src/pods/home/home.component.tsx

```diff
import React from 'react';
- import { GatsbyImage } from 'gatsby-plugin-image';
+ import { GatsbyImage, getImage } from 'gatsby-plugin-image';
- import { Link } from 'gatsby';
+ import { Link, useStaticQuery, graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { routes } from 'core/routes';
import * as classes from './home.styles';

+ const query = graphql`
+   query {
+     homeLogo: file(relativePath: { eq: "home-logo.png" }) {
+       childImageSharp {
+         gatsbyImageData(layout: FIXED, placeholder: BLURRED)
+       }
+     }
+   }
+ `;

export const Home: React.FunctionComponent = () => {
+ const { homeLogo } = useStaticQuery(query);

  return (
    <div className={classes.root}>
      <Typography variant="h1">Welcome to this website</Typography>
+     <Image fixed={homeLogo.childImageSharp.fixed} />
      <Typography variant="h2">
        Check out our <Link to={routes.blog}>blog</Link>
      </Typography>
    </div>
  );
};

```

> [Docs](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/)

- It load an image resized to `400x400`. If we want to get image size by `screen size`, we have to use `CONSTRAINED` instead:

> NOTE: Show `Network tab`, `disable cache` in chrome dev tools and `srcset`
> [srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

### ./src/pods/home/home.component.tsx

```diff
...

const query = graphql`
  query {
    homeLogo: file(relativePath: { eq: "home-logo.png" }) {
      childImageSharp {
-       gatsbyImageData(layout: FIXED, placeholder: BLURRED)
+       gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
      }
    }
  }
`;

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
