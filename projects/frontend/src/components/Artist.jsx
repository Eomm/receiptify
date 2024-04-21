
export const Artist = ({ artist, rank }) => {
  return (
    <div key={artist.id} className="bg-white rounded-lg shadow-md p-4 relative">
      <img
        src={artist.images[0]?.url}
        alt={artist.name}
        className="w-full h-50 rounded-lg hover:scale-110 transition duration-500 cursor-pointer object-cover"
      />
      <div className="absolute top-0 left-0 bg-teal-700 text-white font-semibold rounded-full p-2 m-2 border-2 border-rose-500">
        {rank + 1}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-600 hover:underline hover:text-rose-400"
          >
            {artist.name}
          </a>
        </h2>
        <p className="text-gray-600">Popularity: {artist.popularity}</p>
        <div className="flex flex-wrap mt-2">
          {artist.genres.map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-teal-200 text-gray-800 rounded-full mr-2 mb-2 text-sm"
            >
              {genre}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}