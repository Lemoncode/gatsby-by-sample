# 05-blog-from-contentful

In this sample we will create a blog using Contentful to store data.

We will start from previous example `04-blog-from-md`:

```bash
npm install
```

- Next step is moves all data to [Contentful](https://www.contentful.com/). This is a CSM to create, manage and dstribute content.

- First, we need to create an account and remove example project.

- Add new space (we have two spaces for free):

![01-add-space](./readme-resources/01-add-space.png)

- After that, we'll create a `Post` as content model:

![02-add-content-type](./readme-resources/02-add-content-type.png)

![03-create-post-model](./readme-resources/03-create-post-model.png)

![04-add-fields](./readme-resources/04-add-fields.png)

> NOTES:
> Select Date only for date in appearance.
> Body is a Text field type but selecting long type option.

- We can add validations to these fields too, it used for validate data when an developer o content manager fill content. We will set all data as required and path with custom validation too:

![05-required-validation](./readme-resources/05-required-validation.png)

> Required: title, date, path and body.

![06-custom-validation](./readme-resources/06-custom-validation.png)

> Pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`

- It's important to save changes after that:

![07-save-changes](./readme-resources/07-save-changes.png)

- Now, we are ready to fill content:

![08-add-content](./readme-resources/08-add-content.png)

![09-publishing-post](./readme-resources/09-publishing-post.png)

- The `body`:

````md
# This is a markdown content from Contentful

- We can insert valid markdown text, even code blocks

```javascript
import React from 'react';

export const MyComponent = () => {
  return <h1>This is a component</h1>;
};
```
````

- We can add `media` files in Contentful and attach it to the post:

![10-add-media](./readme-resources/10-add-media.png)

![11-add-logo](./readme-resources/11-add-logo.png)

![12-link-existing-media](./readme-resources/12-link-existing-media.png)

- The `body`:

````md
# This is a second post

But this post has an image:

````

![13-add-media-to-content](./readme-resources/13-add-media-to-content.png)

- We need get `space-id` and `access-token` from this Contentful space from settings:

![14-access-to-api-key-settings](./readme-resources/14-access-to-api-key-settings.png)

![15-copy-space-id-access-token](./readme-resources/15-copy-space-id-access-token.png)

- Add them to `.env` file inside our project:

### ./.env

```

CONTENTFUL_SPACE_ID=value
CONTENTFUL_ACCESS_TOKEN=value

```

- Now, it's time to refactor our app to connect it with Contentful:

```bash
npm i gatsby-source-contentful gatsby-remark-images-contentful -D
```

- Update `gatsby-config`:

### ./gatsby-config.js

```diff
+ require('dotenv').config();
const path = require('path');

module.exports = {
  ...
  plugins: [
    ...
-   'gatsby-transformer-remark',
+   {
+     resolve: 'gatsby-transformer-remark',
+     options: {
+       plugins: [
+         {
+           resolve: 'gatsby-remark-images-contentful',
+         },
+       ],
+     },
+   },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.resolve(__dirname, 'src/common-app/mock-posts'),
      },
    },
+   {
+     resolve: 'gatsby-source-contentful',
+     options: {
+       spaceId: process.env.CONTENTFUL_SPACE_ID,
+       accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
+     },
+   },
  ],
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
...

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

  const {
    pageContext: { slug },
    data: {
      post: {
-       frontmatter: { title, date },
+       title,
+       date,
-       html,
+       body: {
+         childMarkdownRemark: { html },
+       },
      },
    },
  } = props;
...

```

- And finally, `blog` component:

### ./src/pods/blog/blog.component.tsx

```diff
...

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

...

            <Link
              className={classes.postTitle}
-             to={node.frontmatter.path}
+             to={`/${node.path}`}
-             key={node.frontmatter.title}
+             key={node.title}
            >
-             <Typography variant="body1">{node.frontmatter.title}</Typography>
+             <Typography variant="body1">{node.title}</Typography>
            </Link>
...

```

- Stop and run app again:

```bash
npm start
```

# Appendix

- We can give some styles to code blocks using [PrismJS](https://github.com/PrismJS/prism):

```bash
npm i prismjs -P
npm i gatsby-remark-prismjs -D
```

- Update `gatsby-config`:

### ./gatsby-config.js

```diff
...
  plugins: [
    ...
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images-contentful',
          },
+         {
+           resolve: 'gatsby-remark-prismjs',
+         },
        ],
      },
    },
    ...
  ],
};

```

- How to select a `prismjs` theme in Gatsby? We have to use it in `gatsby-browser.js` file:

> NOTE: [Gatsby lifecycle](https://medium.com/narative/understanding-gatsbys-lifecycle-31c473ba2f2d) > [`gatsby-config.js`](https://www.gatsbyjs.org/docs/gatsby-config/): configure plugins, metadata, etc.
> [`gatsby-node.js`](https://www.gatsbyjs.org/docs/node-apis/): create pages, update webpack or babel config, that is, add config on build time
> [`gatsby-browser.js`](https://www.gatsbyjs.org/docs/browser-apis/): add configuration after initial load, for example, route updates, service worker updates, scroll positioning.

### ./gatsby-browser.js

```javascript
require('prismjs/themes/prism-tomorrow.css');
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
