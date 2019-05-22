# 01-implementation

In this sample we are going to start working with Gatsby pages, React components, images, Graphql, dynamic pages and connect it with Contentful.

We will start from previous example `00-start`:

```bash
npm install
```

- This project looks like normal React project, but we have a special file `gatsby-config.js` where we are going to `config` all gatsby's plugins that we will install.

- Run app:

```bash
npm start
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

### ./gatsby-config.js

```javascript
...
  plugins: [
    ...
    'gatsby-transformer-sharp', // To process images
    'gatsby-plugin-sharp', // Used by gatsby-transformer-sharp
    {
      // To load images
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src/core/images'),
      },
    },
  ]
...
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

> NOTE: Show `Network tab` chrome dev tools and `srcset`
> [srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

### ./src/pods/home/home.component.tsx

```diff
...

const query = graphql`
  query {
    homeLogo: file(relativePath: { eq: "home-logo.png" }) {
      childImageSharp {
-       fixed {
+       fluid(maxWidth: 1000)
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

- Take a look to `blog.component`:

### ./src/pods/blog/blog.component.tsx

```javascript
import * as React from 'react';
import { Link } from 'gatsby';
import * as s from './blog.styles';
const PostTitle = s.PostTitle.withComponent(Link);

export const Blog: React.FunctionComponent = () => (
  <s.Container>
    <s.Title>Blog Page</s.Title>
    <s.Posts>
      <PostTitle to="/my-post">My post</PostTitle>
    </s.Posts>
  </s.Container>
);

```

- We are going to use `common-app/mock-posts` to define posts in markdown, `gatsby-transformer-remark` and `gatsby-source-filesystem` to load md files and render as `HTML`:

### ./gatsby-config.js

```javascript
...
  plugins: [
    ...
    'gatsby-transformer-remark', // To process md files
    {
      // To load mock posts
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.resolve(__dirname, 'src/common-app/mock-posts'),
      },
    },
  ]
...
```

- Take a look graphql server:

```graphql
query {
  postListQuery: allMarkdownRemark {
    nodes {
      frontmatter {
        title
        path
      }
    }
  }
}
```

> NOTE: with order
```
allMarkdownRemark(
      sort: { fields: frontmatter___date, order: ASC }
    )
```

- Update `blog` component:

### ./src/pods/blog/blog.component.tsx

```diff
import * as React from 'react';
- import { Link } from 'gatsby';
+ import { Link, StaticQuery, graphql } from 'gatsby';
import * as s from './blog.styles';
const PostTitle = s.PostTitle.withComponent(Link);

+ const query = graphql`
+   query {
+     postListQuery: allMarkdownRemark(
+       sort: { fields: frontmatter___date, order: ASC }
+     ) {
+       nodes {
+         frontmatter {
+           title
+           path
+         }
+       }
+     }
+   }
+ `;

export const Blog: React.FunctionComponent = () => (
+ <StaticQuery
+   query={query}
+   render={({ postListQuery }) => (
      <s.Container>
        <s.Title>Blog Page</s.Title>
        <s.Posts>
+         {postListQuery.nodes.map(node => (
-           <PostTitle to="/my-post">My post</PostTitle>
+           <PostTitle to={node.frontmatter.path} key={node.frontmatter.title}>
+             {node.frontmatter.title}
+           </PostTitle>
+         ))}
        </s.Posts>
      </s.Container>
+   )}
+ />
);

```

- Now, it's time create the post's page, dynamically. Take a look to `post.component`:

### ./src/pods/post/post.component.tsx

```javascript
import * as React from 'react';
import * as s from './post.styles';

interface Props {
  title: string;
  date: string;
  body;
}

export const Post: React.FunctionComponent<Props> = ({ title, date, body }) => (
  <s.Container>
    <s.Title>{title}</s.Title>
    <s.Subtitle>{date}</s.Subtitle>
    <s.Body dangerouslySetInnerHTML={{ __html: body }} />
  </s.Container>
);

```

- Take a look to GraphQL server:

```graphql
query {
  post: markdownRemark(frontmatter: { path: { eq: "/blog/first-post" } }) {
    frontmatter {
      title
      date
    }
    html
  }
}
```

- To create a dynamic page, we have to overwrite [createPages](https://www.gatsbyjs.org/docs/node-apis/#createPages) method in `gatsby-node.js`:

### ./gatsby-node.js

```diff
const { resolve } = require('path');

const query = `
+ query {
+   postListQuery: allMarkdownRemark {
+     nodes {
+       frontmatter {
+         path
+       }
+     }
+   }
+ }
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(query);
+ const { postListQuery } = data;

+ postListQuery.nodes.forEach(node => {
+   const { path } = node.frontmatter;
+   createPage({
+     path,
+     component: resolve(__dirname, 'src/pods/post/post.template.tsx'),
+     context: {
+       slug: path,
+     },
+   });
+ });
};

```

- Update post `template`:

### ./src/pods/post/post.template.tsx

> NOTE: Difference between [Static Query and page query](https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query)

```diff
import * as React from 'react';
import { graphql } from 'gatsby';
import { SEO } from 'common/components';
import { AppLayout } from 'layout';
import { Post } from './post.component';

export const query = graphql`
+ query($slug: String) {
+   post: markdownRemark(frontmatter: { path: { eq: $slug } }) {
+     frontmatter {
+       title
+       date
+     }
+     html
+   }
+ }
`;

...

```

- Next step could be use [Contentful](https://www.contentful.com/) as CMS to create, manage and dristribute content. We need to provide `Space Id` and `Access Token` via environment variables, and use `gatsby-source-contentful` plugin. If we use images in contentful markdowns, we have to install `gatsby-remark-images-contentful` too:

### ./gatsby-config.js

```javascript
...
  plugins: [
    ...
    {
      // To load contentful account
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
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
  ]
...
```

- Update `gatsby-node` file:

### ./gatsby-node.js

```diff
...

exports.createPages = async ({ graphql, actions }) => {
...

  postListQuery.nodes.forEach(node => {
    const { path } = node.frontmatter;
+   if (path) {
      createPage({
        path,
        component: resolve(__dirname, 'src/pods/post/post.template.tsx'),
        context: {
          slug: path,
        },
      });
+   }
  });
};

```

- Run app:

```bash
npm start
```

- Take a look to GraphQL server. Now we have `contentfulPost`:

```graphql
query {
  postListQuery: allContentfulPost {
    nodes {
      title
      date
      path
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
}

```

- Update `gatsby-node` to retrieve contentful posts:

### ./gatsby-node.js

```diff
const { resolve } = require('path');

const query = `
query {
- postListQuery: allMarkdownRemark {
+ postListQuery: allContentfulPost {
    nodes {
-     frontmatter {
        path
-     }
    }
  }
}
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(query);
  const { postListQuery } = data;

  postListQuery.nodes.forEach(node => {
-   const { path } = node.frontmatter;
+   const { path } = node;
    if (path) {
      createPage({
        path,
        component: resolve(__dirname, 'src/pods/post/post.template.tsx'),
        context: {
          slug: path,
        },
      });
    }
  });
};

```

- Update `post.template` too:

### ./src/pods/post/post.template.tsx

```diff
import * as React from 'react';
import { graphql } from 'gatsby';
import { SEO } from 'common/components';
import { AppLayout } from 'layout';
import { Post } from './post.component';

export const query = graphql`
  query($slug: String) {
-   post: markdownRemark(frontmatter: { path: { eq: $slug } }) {
+   post: contentfulPost(path: { eq: $slug }) {
-     frontmatter {
      title
      date
-     }
+     body {
+       childMarkdownRemark {
          html
+       }
+     }
    }
  }
`;

...

const PostTemplate: React.StatelessComponent<Props> = ({
  pageContext: { slug },
  data: {
    post: {
-     frontmatter: { title, date },
+     title,
+     date,
-     html,
+     body: {
+       childMarkdownRemark: { html },
+     },
    },
  },
}) => {
...

```

- And finally, `blog` component:

### ./src/pods/blog/blog.component.tsx

```diff
import * as React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import * as s from './blog.styles';
const PostTitle = s.PostTitle.withComponent(Link);

const query = graphql`
  query {
-   postListQuery: allMarkdownRemark(
+   postListQuery: allContentfulPost(
-     sort: { fields: frontmatter___date, order: ASC }
+     sort: { fields: date, order: ASC }
    ) {
      nodes {
-       frontmatter {
        title
        path
-       }
      }
    }
  }
`;

export const Blog: React.FunctionComponent = () => (
  <StaticQuery
    query={query}
    render={({ postListQuery }) => (
      <s.Container>
        <s.Title>Blog Page</s.Title>
        <s.Posts>
          {postListQuery.nodes.map(node => (
-           <PostTitle to={node.frontmatter.path} key={node.frontmatter.title}>
+           <PostTitle to={node.path} key={node.title}>
-             {node.frontmatter.title}
+             {node.title}
            </PostTitle>
          ))}
        </s.Posts>
      </s.Container>
    )}
  />
);

```

- Stop and run app again:

```bash
npm start
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
