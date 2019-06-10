# 04-blog-from-md

In this sample we will create a blog using local markdown files.

We will start from previous example `03-handling-images`:

```bash
npm install
```

- Right now, we have a "hardcoded" blog page. Take a look to `blog.component`:

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

- Instead of that, we want to use `common-app/mock-posts` files to create and style the `blog/post` components using local files and then move to cloud approach. That is, using a progressive web design:

```bash
npm i gatsby-transformer-remark -P
```

### ./gatsby-config.js

```diff
...
  plugins: [
    ...
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, 'src/core/images'),
      },
    },
+   'gatsby-transformer-remark',
+   {
+     resolve: 'gatsby-source-filesystem',
+     options: {
+       name: 'posts',
+       path: path.resolve(__dirname, 'src/common-app/mock-posts'),
+     },
+   },
  ],
};

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

- Now, it's time create the post's page, dynamically. Let's create a `post.component`:

### ./src/pods/post/post.styles.tsx

```javascript
import { styled } from 'core/styles';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.typography.title};
`;

export const Subtitle = styled.h2`
  ${({ theme }) => theme.typography.subtitle};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin-top: 3rem;
`

```

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

```javascript
const { resolve } = require('path');

const query = `
query {
  postListQuery: allMarkdownRemark {
    nodes {
      frontmatter {
        path
      }
    }
  }
}
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(query);
  const { postListQuery } = data;

  postListQuery.nodes.forEach(node => {
    const { path } = node.frontmatter;
    if(path) {
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

- Create `post.template.tsx`:

### ./src/pods/post/post.template.tsx

> NOTE: Difference between [Static Query and page query](https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query)

```javascript
import * as React from 'react';
import { graphql } from 'gatsby';
import { SEO } from 'common/components';
import { AppLayout } from 'layout';
import { Post } from './post.component';

export const query = graphql`
  query($slug: String) {
    post: markdownRemark(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`;

interface Props {
  data: { post };
  pageContext: {
    slug: string;
  };
}

const PostTemplate: React.StatelessComponent<Props> = ({
  pageContext: { slug },
  data: {
    post: {
      frontmatter: { title, date },
      html,
    },
  },
}) => {
  return (
    <AppLayout
      pathname={slug}
      seoComponent={
        <SEO
          title={title}
          keywords={[
            'lemoncode',
            'gatsby',
            'gatsby by sample',
            'frontent',
            'ssr',
            slug,
          ]}
        />
      }
    >
      <Post title={title} date={date} body={html} />
    </AppLayout>
  );
};

export default PostTemplate;

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
