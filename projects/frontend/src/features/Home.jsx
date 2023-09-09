
const API_URL = import.meta.env.VITE_API_URL

export const Home = () => {
  const handleClick = () => {
    window.location.href = API_URL + '/login/spotify'
  }

  return (
    <>
      <div className="flex flex-col items-center mt-16 min-h-screen">
        <h2 className="text-4xl font-bold mb-6 text-center">Receiptify</h2>
        <p className="text-xl mb-8 text-center">A tool that displays your music stats</p>
        <button className="bg-green-500 text-white px-8 py-4 rounded-md text-lg font-semibold shadow-md hover:bg-rose-400" onClick={handleClick}>
          Login with Spotify
        </button>
      </div>
    </>
  )
}
