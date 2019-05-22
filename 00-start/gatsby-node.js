const { resolve } = require('path');

const query = `

`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(query);
};
