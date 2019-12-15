# 02-navigation

In this sample we will add some page navigation with Gatsby.

We will start from previous example `01-hello-gatsby`:

```bash
npm install
```

- First, we are going to create a second page:

### ./src/pages/blog.tsx

```javascript
import React from 'react';
import { SEO } from 'common/components';

const BlogPage = () => {
  return (
    <>
      <SEO
        title="Blog"
        keywords={[
          'lemoncode',
          'gatsby',
          'gatsby by sample',
          'frontent',
          'ssr',
        ]}
      />
      <div>This is a blog page</div>
    </>
  );
};

export default BlogPage;
```

- Run app and navigate to `/blog`:

```bash
npm start
```

- We have to ways to navigate in Gatsby. Using `link` component:

### ./src/pages/index.ts

```diff
import React from 'react';
+ import { Link } from 'gatsby';
import { css } from 'emotion';
import { SEO } from 'common/components';

...
const IndexPage = () => (
  <>
    ...
    <div className={root}>Hello from Gatsby</div>
+   <Link to="/blog">Navigate to blog</Link>
  </>
);
...

```

- Or programmatically:

### ./src/pages/blog.tsx

```diff
import React from 'react';
+ import { navigate } from 'gatsby';
import { SEO } from 'common/components';

const BlogPage = () => {
+ const handleNavigate = () => {
+   navigate('/');
+ };

  return (
    <>
      <SEO
        title="Blog"
        keywords={[
          'lemoncode',
          'gatsby',
          'gatsby by sample',
          'frontent',
          'ssr',
        ]}
      />
      <div>This is a blog page</div>
+     <button onClick={handleNavigate}>Navigate using button</button>
    </>
  );
};

```

- Finally, since we are using layouts, we are going to refactor both pages and use it:

### ./src/pages/index.tsx

```diff
import React from 'react';
- import { Link } from 'gatsby';
- import { css } from 'emotion';
+ import { PageRendererProps } from 'gatsby';
import { SEO } from 'common/components';
+ import { AppLayout } from 'layouts';
+ import { Home } from 'pods/home';

- const root = css`
-   background-color: tomato;
-   color: white;
-   font-size: 4rem;
-   font-family: 'Open Sans';
-   padding: 2rem;
- `;

- const IndexPage = () => {
+ const IndexPage: React.FunctionComponent<PageRendererProps> = props => {
+   const { location } = props;
    return (
-     <>
+     <AppLayout
+       pathname={location.pathname}
+       seoComponent={
          <SEO
            title="Home"
            keywords={[
              'lemoncode',
              'gatsby',
              'gatsby by sample',
              'frontent',
              'ssr',
            ]}
          />
+       }
+     >
-       <div className={root}>Hello from Gatsby</div>
-       <Link to="/blog">Navigate to blog</Link>
+       <Home />
-     </>
+     </AppLayout>
    );
  };

...

```

- Update `blog` page:

### ./src/pages/blog.tsx

```diff
import React from 'react';
- import { navigate } from 'gatsby';
+ import { PageRendererProps } from 'gatsby';
import { SEO } from 'common/components';
+ import { AppLayout } from 'layouts';
+ import { Blog } from 'pods/blog';

- const BlogPage = () => {
+ const BlogPage: React.FunctionComponent<PageRendererProps> = props => {
+   const { location } = props;
-   const handleNavigate = () => {
-     navigate('/');
-   };

    return (
-     <>
+     <AppLayout
+       pathname={location.pathname}
+       seoComponent={
          <SEO
            title="Blog"
            keywords={[
              'lemoncode',
              'gatsby',
              'gatsby by sample',
              'frontent',
              'ssr',
            ]}
          />
+       }
+     >
-       <div>This is a blog page</div>
-       <button onClick={handleNavigate}>Navigate using button</button>
+       <Blog />
-     </>
+     </AppLayout>
    );
  };

...

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
