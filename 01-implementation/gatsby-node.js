const { resolve } = require('path');

const query = `
query {
  postListQuery: allMarkdownRemark {
    edges {
      node {
        frontmatter {
          path
        }
      }
    }
  }
}
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(query);
  const { postListQuery } = data;

  postListQuery.edges.forEach(({ node }) => {
    const { path } = node.frontmatter;
    createPage({
      path,
      component: resolve(
        __dirname,
        'src/pods/post/post.template.tsx'
      ),
      context: {
        slug: path,
      },
    });
  });
};
