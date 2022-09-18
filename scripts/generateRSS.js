const { GraphQLClient, gql } = require('graphql-request');
const { Feed } = require('feed');
const fs = require('fs');

module.exports = async () => {
  try {
    const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_KEY);

    const query = gql`
      query Posts {
        posts(orderBy: createdAt_DESC, ${process.env.NODE_ENV === 'production' ? 'stage: PUBLISHED' : 'stage: DRAFT'}) {
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

    const baseUrl = 'https://janasundar.dev';
    const date = new Date();
    const author = {
      name: 'Janarthanan',
      email: 'janasundar1997@gmail.com',
      link: 'https://twitter.com/Jana__Sundar',
    };

    const feed = new Feed({
      title: `Jana's Blog`,
      description: 'Welcome to my blog!',
      id: baseUrl,
      link: baseUrl,
      language: 'en',
      image: `${baseUrl}/Logo.svg`,
      favicon: `${baseUrl}/favicon.ico`,
      copyright: `All rights reserved ${date.getFullYear()}, Janarthanan`,
      updated: date,
      generator: 'Next.js using Feed for Node.js',
      feedLinks: {
        rss2: `${baseUrl}/rss.xml`,
      },
      author,
    });

    posts.forEach((post) => {
      const url = `${baseUrl}/posts/${post.slug}`;
      feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post.description,
        author: [author],
        contributor: [author],
        date: new Date(post.createdAt),
      });
    });

    fs.writeFileSync('public/rss.xml', feed.rss2());
  } catch (err) {
    console.log('Error occured while generating rss', err);
    process.exit(1);
  }
};
