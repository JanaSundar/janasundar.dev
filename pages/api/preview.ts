import { NextApiRequest, NextApiResponse } from 'next';
import { getPost } from '~helpers/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.GRAPHCMS_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await getPost(req.query.slug as string, true);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setDraftMode({ enable: true })

  res.redirect(`/blog/${post.slug}`)
}
