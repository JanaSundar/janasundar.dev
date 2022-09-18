import MusicIcon from './SVG/MusicIcon';
import useSWR from 'swr';
import Link from 'next/link';

interface NowPlayingSong {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export default function Spotify() {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher);

  return (
    <div className="container pt-32">
      <div className="px-8 pb-8 border-2 border-gray-700 rounded-3xl">
        <p className="inline-flex items-center px-4 text-sm sm:text-lg font-bold -translate-y-4 bg-primary text-blue-550 transform-gpu">
          <MusicIcon className="mr-2" />
          Now listening to
        </p>
        {data?.isPlaying && (
          <div className="flex items-center gap-4">
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="h-20 w-20 rounded song-art"
                src={data.albumImageUrl}
                alt={`Album cover of ${data.album} by ${data.artist}`}
                crossOrigin="anonymous"
              />
            }
            <Link href={data.songUrl} passHref>
              <a target="_blank">
                <p className="text-base sm:text-lg">{data.title}</p>
                <p className="text-gray-500 text-sm sm:text-base">{data.artist}</p>
              </a>
            </Link>
          </div>
        )}
        {!data ? (
          <div className="flex items-center">
            <div className="flex items-center justify-center w-20 h-20 text-gray-700 bg-gray-100 rounded song-art">
              <MusicIcon />
            </div>
            <div className="ml-4">
              <p className="h-6 mb-2 text-lg bg-gray-700 w-44 sm:w-60 animate-pulse"></p>
              <p className="w-32 sm:w-40 h-6 bg-gray-700 animate-pulse"></p>
            </div>
          </div>
        ) : (
          !data?.isPlaying && (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold">Nothing...</h2>
              <p>Do you know a good song I should listen to?</p>
              <a
                className="px-8 py-2 mt-4 text-sm text-center text-white transition-colors border rounded-full font-bold hover:border-white hover:bg-white hover:text-gray-700"
                href="https://twitter.com/messages/compose?recipient_id=1145645832999301120&text=Hey Jana, you should listen to:"
                data-screen-name="@jana__sundar"
                target="_blank"
                rel="noreferrer noopener"
              >
                let me know!
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}
