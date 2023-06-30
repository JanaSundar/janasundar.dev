export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'GET',
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
    },
  });

  const data = await result.json();

  if (!result.ok) {
    return new Response(JSON.stringify({ error: 'Error retrieving subscribers' }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ count: data.length }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
