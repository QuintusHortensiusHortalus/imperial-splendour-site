import { FluidObject } from 'gatsby-image';

export type InfoBox = {
  image: FluidObject;
  imageAlt: string;
  text: string;
};

// ---
// Post GraphQL Response

export type Post = {
  node: {
    id: number;
    frontmatter: PostFrontmatter;
  };
};

export type GraphQLResponse = {
  data: {
    allMarkdownRemark: {
      edges: Post[];
    };
  };
};

export type SingleGraphQLResponse = {
  data: {
    markdownRemark: {
      frontmatter: PostFrontmatter;
      html: string;
    };
    allCommentsYaml: {
      edges: Comment[];
    };
  };
};

export type ToSGraphQLResponse = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        description: string;
      };
      html: string;
    };
  };
};

export type PostFrontmatter = {
  title: string;
  author: string;
  date: string;
  formattedDate: string;
  excerpt: string;
};

export type Comment = {
  node: {
    id: number;
    date: string;
    name: string;
    comment: string;
    email?: string;
    website?: string;
    slug: string;
  };
};

export type BlogListContext = {
  pageContext: {
    numberOfPages: number;
    currentPage: number;
  };
};
