
export const Track = ({ track, rank }) => {
  return (
    <div key={track.id} className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row items-start">
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <img
            src={track.album.images[0]?.url}
            alt={track.name}
            className="w-16 h-16 md:w-24 md:h-24 rounded-md"
          />
          <p className="text-gray-400 mt-2">{track.popularity} Popularity</p>
        </div>

        <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-4">
          <h2 className="flex text-xl font-semibold items-start">
            <span className="px-2 py-1 bg-teal-200 text-gray-800 rounded-full mr-2 text-sm">
              {rank + 1}
            </span>
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline hover:text-rose-400"
            >
              {track.name}
            </a>
          </h2>

          <div className="mt-2">
            <p className="text-gray-600">
              {track.artists.map((artist) => (
                <span
                  key={artist.id}
                  className="px-2 py-1 bg-teal-100 text-gray-800 rounded-full mr-2 text-sm"
                >
                  {artist.name}
                </span>
              ))}
            </p>

            {track.preview_url && (
              <audio controls className="w-full mt-2">
                <source src={track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
