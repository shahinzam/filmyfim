'use client';
import { useState, useEffect } from 'react';
import { translateGenre } from './utils/translations';

interface Movie {
  name: string;
  score: number;
  description: string;
  image: string;
  genre: string;
  imdb_id: string | null;
}

export default function Home() {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const fetchFeaturedMovies = async () => {
    setIsFeaturedLoading(true);
    setFetchError('');
    try {
      const response = await fetch('https://filmyfim-production.up.railway.app/featured-movies');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFeaturedMovies(data.movies);
    } catch (err) {
      console.error('Error fetching featured movies:', err);
      setFetchError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات');
    } finally {
      setIsFeaturedLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedMovies();
  }, []);

  const handleRefresh = () => {
    setSelectedMovie(null);
    setRecommendedMovies([]);
    fetchFeaturedMovies();
  };

  const handleMovieSelect = async (movieName: string) => {
    if (isLoading) return;
    setSelectedMovie(movieName);
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://filmyfim-production.up.railway.app/recommend', {        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie_title: movieName }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendedMovies(data.recommendations);
    } catch (err) {
      setError('Failed to get movie recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-radial from-gray-900 via-purple-900/10 to-gray-900 text-white p-2 sm:p-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-12 text-center pt-8 sm:pt-12 
          bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 
          animate-gradient-shift bg-300% persian-text-bold">
          پیشنهاد فیلم‌های مشابه
        </h1>
        
        <div className="mb-8">
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center mb-6 gap-4">
            <button
              onClick={handleRefresh}
              className="w-full sm:w-auto px-6 py-3 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 
                transition-all duration-300 flex items-center justify-center gap-2 persian-text backdrop-blur-sm
                hover:shadow-lg hover:shadow-purple-500/10 border border-purple-500/20"
              disabled={isFeaturedLoading}
            >
              {isFeaturedLoading ? 'در حال بارگذاری' : 'فیلم‌های جدید'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-300 persian-text-bold text-right w-full sm:w-auto">
              یک فیلم انتخاب کنید
            </h2>
          </div>

          {isFeaturedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 rounded-xl h-[500px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
              {featuredMovies.map((movie, index) => (
                <div 
                  key={index}
                  onClick={() => handleMovieSelect(movie.name)}
                  className={`group bg-white/5 rounded-xl overflow-hidden backdrop-blur-md border 
                    ${selectedMovie === movie.name 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                      : 'border-white/10 hover:border-purple-500/50'} 
                    transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 
                    hover:-translate-y-1 cursor-pointer max-w-sm mx-auto w-full`}
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    <div className="absolute top-2 right-2 transform transition-transform duration-300 group-hover:scale-110">
                      <span className="bg-black/50 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
                        ★ {movie.score}
                      </span>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="bg-black/50 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-full text-sm persian-text">
                        {translateGenre(movie.genre)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 english-text-bold">
                      {movie.name}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-3 text-right persian-text" dir="rtl">
                      {movie.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        
        {fetchError && (
          <p className="text-red-400 text-center mt-2 text-sm persian-text">
            {fetchError}
          </p>
        )}
        
        {recommendedMovies.length > 0 && (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-purple-300 persian-text-bold">
              فیلم‌های پیشنهادی
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
              {recommendedMovies.map((movie, index) => (
                <div 
                  key={index}
                  className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 
                    hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl 
                    hover:shadow-purple-500/10 hover:-translate-y-1 max-w-sm mx-auto w-full"
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={movie.image || `https://via.placeholder.com/500x750?text=${encodeURIComponent(movie.name)}`}
                      alt={movie.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/50 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
                        ★ {movie.score}
                      </span>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="bg-black/50 backdrop-blur-sm text-purple-300 px-3 py-1 rounded-full text-sm persian-text">
                        {translateGenre(movie.genre)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 english-text-bold group flex items-center gap-2">
                      <a 
                        href={movie.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}` : '#'} 
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                      >
                        {movie.name}
                        {movie.imdb_id && (
                          <svg 
                            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        )}
                      </a>
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-3 text-right persian-text" dir="rtl">
                      {movie.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
