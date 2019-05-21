# 01-implementation

We will start from previous example `00-start`:

- Post List query:

```graphql
query {
  postListQuery: allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          path
        }
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

- Post item query:

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

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
