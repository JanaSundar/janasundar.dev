const fs = require('fs');
const puppeteer = require('puppeteer-core');
const { getAllPosts } = require('./getPost');
const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://localhost:3001' : 'http://og-image.janasundar.dev';

(async () => {
  const posts = await getAllPosts();

  posts.forEach(async (post) => {
    const qs = new URLSearchParams({
      title: post.title,
    });
    const url = `${baseUrl}?${qs.toString()}`;
    const ogImageDir = `./public/images/og`;
    const imagePath = `${ogImageDir}/${post.slug}.png`;

    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    const buffer = await page.screenshot({ type: 'png' });
    await browser.close();

    fs.mkdirSync(ogImageDir, { recursive: true });
    fs.writeFileSync(imagePath, buffer);
  });
})();
