import faunadb from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  ref: object;
  data: {
    slug: string;
    views: number;
  };
}

const { Get, Match, Index, Create, Update, Exists, Collection } = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY!,
  domain: 'db.fauna.com',
});

const matchIndexBySlug = (slug: string) => Match(Index('query_by_slug'), slug);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slug = req.query.slug!.toString();

    if (req.method === 'POST') {
      const doesDocExist = await client.query(Exists(matchIndexBySlug(slug)));
      if (!doesDocExist) {
        await client.query(
          Create(Collection('page_views'), {
            data: { slug: slug, views: 0 },
          })
        );
      }

      const document = await client.query<Data>(Get(matchIndexBySlug(slug)));
      const { data } = await client.query<Data>(
        Update(document.ref, {
          data: {
            views: document.data.views + 1,
          },
        })
      );

      return res.status(201).json({ views: data.views, success: true });
    }

    if (req.method === 'GET') {
      const { data } = await client.query<Data>(Get(matchIndexBySlug(slug)));

      return res.status(200).json({ views: data.views, success: true });
    }
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(500).json({ message: message, success: false });
  }
}
