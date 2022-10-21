import { gql, GraphQLClient } from 'graphql-request';

export type Tags = {
  tag: string;
};

export interface Post {
  slug: string;
  title: string;
  tags: Tags[];
  content: string;
  createdAt: string;
  description: string;
}

export interface PostWithFiles extends Post {
  files: {
    [x: string]: string;
  } | null;
  updatedAt: string;
}

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY as string);

export const getSinglePost = async (slug: string, isPreview = false) => {
  const query = gql`
    query Posts($slug: String!) {
      post(where: { slug: $slug }, ${(process.env.NODE_ENV === 'production' && !isPreview) ? 'stage: PUBLISHED' : 'stage: DRAFT'}) {
        title
        content
        description
        files
        slug
        tags {
          tag
        }
        updatedAt
        createdAt
      }
    }
  `;

  const { post }: { post: PostWithFiles } = await client.request(query, { slug });

  return post;
};

export const getAllPosts = async (isLastFive = false) => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY as string);

  const query = gql`
    query Posts {
      posts(orderBy: createdAt_DESC, ${isLastFive ? 'last: 5' : ''},${
    process.env.NODE_ENV === 'production' ? 'stage: PUBLISHED' : 'stage: DRAFT'
  }) {
        slug
        title
        description
        createdAt
        content
        tags {
          tag
        }
      }
    }
  `;

  const { posts }: { posts: [Post] } = await client.request(query);

  return posts;
};

export const getAllSlugs = async () => {
  const query = gql`
    query AllSlug {
      posts(${process.env.NODE_ENV === 'production' ? 'stage: PUBLISHED' : 'stage: DRAFT'}) {
        slug
      }
    }
  `;

  const { posts: Slugs }: { posts: [{ slug: string }] } = await client.request(query);

  return Slugs;
};

export const getAllSnippets = async () => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY as string);

  const query = gql`
    query Snippets {
      snippets(orderBy: createdAt_DESC, ${
    process.env.NODE_ENV === 'production' ? 'stage: PUBLISHED' : 'stage: DRAFT'
  }) {
        slug
        title
        description
        createdAt
        content
        tags {
          tag
        }
      }
    }
  `;

  const { posts }: { posts: [Post] } = await client.request(query);

  return posts;
};
