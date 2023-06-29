import { gql, GraphQLClient } from 'graphql-request';

export type Tags = {
  tag: string;
};

export interface Content {
  slug: string;
  title: string;
  tags: Tags[];
  content: string;
  createdAt: string;
  description: string;
}

export interface PostWithFiles extends Content {
  files: {
    [x: string]: string;
  } | null;
  updatedAt: string;
}

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY as string);

export const getPost = async (slug: string, isPreview = false) => {
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

export const getContents = async (schema: string, isLastFive = false) => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY as string);

  const query = gql`
    query Contents {
      ${schema}(orderBy: createdAt_DESC, ${isLastFive ? 'last: 5' : ''},${process.env.NODE_ENV === 'production' ? 'stage: PUBLISHED' : 'stage: DRAFT'
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

  const contents: { [x: string]: Content[] } = await client.request(query);

  return contents[schema];
};

export const getSlugs = async (schema: string) => {
  const query = gql`
    query Slugs {
      ${schema}(${process.env.NODE_ENV === 'production' ? 'stage: PUBLISHED' : 'stage: DRAFT'}) {
        slug
      }
    }
  `;

  const Slugs: { [schema: string]: [{ slug: string }] } = await client.request(query);

  return Slugs[schema];
};

export const getSnippet = async (slug: string, isPreview = false) => {
  const query = gql`
    query Snippet($slug: String!) {
      snippet(where: { slug: $slug }, ${(process.env.NODE_ENV === 'production' && !isPreview) ? 'stage: PUBLISHED' : 'stage: DRAFT'}) {
        title
        content
        description
        slug
        tags {
          tag
        }
        updatedAt
        createdAt
      }
    }
  `;

  const { snippet }: { snippet: Content } = await client.request(query, { slug });

  return snippet;
};