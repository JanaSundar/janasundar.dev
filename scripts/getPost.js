const { GraphQLClient, gql } = require('graphql-request');

exports.getAllPosts = async () => {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY);

  const query = gql`
    query Posts {
      posts(orderBy: createdAt_DESC ,${process.env.NODE_ENV === 'production' ? 'stage: PUBLISHED' : 'stage: DRAFT'}) {
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

  const { posts } = await client.request(query);

  return posts;
};
