const { loadEnvConfig } = require('@next/env');
const { Feed } = require('feed');
const fs = require('fs');
const Showdown = require('showdown');
const { getAllPosts } = require('./getPost');

loadEnvConfig(process.cwd());

(async () => {
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

  const posts = await getAllPosts();
  const converter = new Showdown.Converter();

  posts.forEach((post) => {
    const url = `${baseUrl}/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: converter.makeHtml(post.content),
      author: [author],
      contributor: [author],
      date: new Date(post.createdAt),
    });
  });

  fs.writeFileSync('public/rss.xml', feed.rss2());
})();
