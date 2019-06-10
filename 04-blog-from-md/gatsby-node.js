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
