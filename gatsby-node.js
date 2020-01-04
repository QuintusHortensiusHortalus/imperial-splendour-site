/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require(`path`);

const POSTS_PER_PAGE = 6;

const POST_QUERY = `
  {
    posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data\/posts/"}}) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  tos: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data\/terms-of-service/"}}) {
    edges {
      node {
        id
        frontmatter {
          title
          description
        }
      }
    }
  }
}
`;

const createSlug = (rawTitle, date) => {
  const title = rawTitle
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/(-+)/g, '-');

  return `${date}-${title}`;
};

const buildBlogPosts = (nodes, createPage) => {
  const post = resolve(`./src/templates/post.tsx`);

  nodes.forEach(({ node }) => {
    const slug = createSlug(node.frontmatter.title, node.frontmatter.date);
    createPage({
      path: `blog/${slug}`,
      component: post,
      context: { slug, id: node.id },
    });
    console.log(slug);
  });
};

const buildTermsOfService = (nodes, createPage) => {
  const termsOfService = resolve(`./src/templates/terms-of-service.tsx`);

  nodes.forEach(({ node }) => {
    createPage({
      path: `terms-of-service`,
      component: termsOfService,
      context: { id: node.id },
    });
  });
  console.log('done');
};

const buildBlogListPagination = (nodes, createPage) => {
  const blogList = resolve('./src/templates/blog.tsx');

  const numberOfPages = Math.ceil(nodes.length / POSTS_PER_PAGE);
  Array.from({ length: numberOfPages }).forEach((_, i) => {
    const path = '/blog' + (i === 0 ? '' : `/${i + 1}`);
    createPage({
      path,
      component: blogList,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numberOfPages,
        currentPage: i + 1,
      },
    });
    console.log(path);
    console.log(
      JSON.stringify({
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numberOfPages,
        currentPage: i + 1,
      })
    );
    console.log();
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(POST_QUERY);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  console.log('\nCreating Blog Posts...');
  buildBlogPosts(result.data.posts.edges, actions.createPage);

  console.log('\nCreating Terms of Service...');
  buildTermsOfService(result.data.tos.edges, actions.createPage);

  console.log('\nPaginating Blog Posts List...');
  buildBlogListPagination(result.data.posts.edges, actions.createPage);

  console.log();
};
