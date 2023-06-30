import { NextApiRequest, NextApiResponse } from 'next';
import { getPost, getSnippet } from '~helpers/queries';

const getContentFnFromtype = (type: string) => {
  switch (type) {
    case 'post':
      return getPost;
    case 'snippet':
      return getSnippet;
    default:
      throw new Error('Invalid type')
  }
}

const getUrlPathnameFromType = (type: string) => {
  switch (type) {
    case 'post':
      return `/blog/`;
    case 'snippet':
      return `/snippet/`;

    default:
      throw new Error('Invalid type')
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.GRAPHCMS_PREVIEW_SECRET || !req.query.slug || !req.query.type) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const fn = getContentFnFromtype(req.query.type as string)

  const content = await fn(req.query.slug as string, true);

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setDraftMode({ enable: true })

  res.redirect(`${getUrlPathnameFromType(req.query.type as string)}${content.slug}`)
}
