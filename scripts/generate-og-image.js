const fs = require('fs');
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const { getAllPosts } = require('./getPost');
const { loadEnvConfig } = require('@next/env');

loadEnvConfig(process.cwd());

const isDev = process.env.NODE_ENV === 'development';
const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = isDev ? 'http://localhost:3001' : 'http://og-image.janasundar.dev';

const getOptions = async () => {
  let options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  return options;
};

(async () => {
  const posts = await getAllPosts();

  posts.forEach(async (post) => {
    const qs = new URLSearchParams({
      title: post.title,
    });
    const url = `${baseUrl}?${qs.toString()}`;
    const ogImageDir = `./public/images/og`;
    const imagePath = `${ogImageDir}/${post.slug}.png`;
    const options = await getOptions();

    const browser = await puppeteer.launch({
      ...options,
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
