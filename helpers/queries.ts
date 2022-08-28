import { gql, GraphQLClient } from 'graphql-request';

export type Tags = {
  tag: string;
};

export interface Post {
  slug: string;
  title: string;
  tags: Tags[];
  content: string;
}

export interface PostWithFiles extends Post {
  files: {
    [x: string]: string;
  } | null;
}

export interface PostWithDescription extends Post {
  description: string;
  createdAt: string;
}

export const getSinglePost = async (slug: string) => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY as string);

  const query = gql`
    query Posts($slug: String!) {
      post(where: { slug: $slug }, ${process.env.NODE_ENV === 'production' ? 'stage: PUBLISHED' : 'stage: DRAFT'}) {
        title
        content
        files
        slug
        tags {
          tag
        }
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

  const { posts }: { posts: [PostWithDescription] } = await client.request(query);

  return posts;
};

export const getAllSlugs = async () => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY as string);
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
