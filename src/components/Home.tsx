import React, { useState } from 'react';
import { useUser } from '../context/context';
import { Link } from 'react-router-dom';
import { Movie } from '../models/model';
import Navbar from './Navbar';
import BookedTicketsPopup from './BookedTicketsPopup';

interface HomeProps {
  movies: Movie[];
}

const Home: React.FC<HomeProps> = ({ movies }) => {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(1);
  const [scale, setScale] = useState(1);
  const moviesPerPage = 4;
  const [showBookedTicket, setShowBookedTicket] = useState(false);
  const handleNext = () => {
    if (currentIndex + moviesPerPage < movies.length) {
      setScale(0.95);
      setFade(0);
      setTimeout(() => {
        setCurrentIndex(currentIndex + moviesPerPage);
        setFade(1);
        setScale(1);
      }, 200);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - moviesPerPage >= 0) {
      setScale(0.95);
      setFade(0);
      setTimeout(() => {
        setCurrentIndex(currentIndex - moviesPerPage);
        setFade(1);
        setScale(1);
      }, 200);
    }
  };

  return (
    <>
      <Navbar />
      {/* version 1 */}
      <div className='flex justify-center items-center'>
        <div className="w-full mt-20 px-4">
          <h1 className="text-2xl font-bold mb-4 ml-10">Available Movies</h1>
          <div className="overflow-x-auto scrollbar-hidden">
            <div className="flex space-x-4 p-10">
              {movies.map((movie, index) => (
                <div key={index} className="rounded-lg shadow-lg w-72 sm:w-96 flex-shrink-0">
                  <img
                    style={{ height: "450px", width: "100%" }}
                    className="object-cover rounded-t-lg"
                    src={movie.movieImg}
                    alt={movie.movieName}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{movie.movieName}</h2>
                    <p className="text-gray-700">Ratings: {movie.movieRatings}</p>
                    <p className="text-gray-700">Price: Rs {movie.amount}</p>
                    <div onClick={()=>setShowBookedTicket(true)}>
                      <a onClick={()=>setIndex(index)} className="mt-2 inline-block rounded bg-gray-700 text-white px-4 py-2">Book Tickets</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* version 2 */}
      {/* <div className="container mx-auto mt-20 px-4">
        <h1 className="text-2xl font-bold mb-4">Available Movies</h1>
        <div className="flex justify-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-96 sm:w-full transition-opacity duration-300"
            style={{ opacity: fade, transform: `scale(${scale})` }}
          >
            {movies.slice(currentIndex, currentIndex + moviesPerPage).map((movie, index) => (
              <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                <img style={{ height: "450px" }} className="w-full object-cover" src={movie.movieImg} alt={movie.movieName} />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{movie.movieName}</h2>
                  <p className="text-gray-700">Ratings: {movie.movieRatings}</p>
                  <p className="text-gray-700">Price: Rs{movie.amount}</p>
                  <Link to={`/movie/${index}`} className="mt-2 inline-block rounded bg-gray-700 text-white px-4 py-2">Book Tickets</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <div className="flex items-center gap-4 justify-center sm:justify-between mb-4">
          <button
            onClick={handlePrevious}
            className={`px-4 py-2 text-white h-10 bg-gray-700 rounded ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 text-white h-10 bg-gray-700 rounded ${currentIndex + moviesPerPage >= movies.length ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIndex + moviesPerPage >= movies.length}
          >
            &gt;
          </button>
        </div>
      </div> */}
            <BookedTicketsPopup
                isVisible={showBookedTicket}
                setIsVisible={setShowBookedTicket}
                movies={movies}
                index={index}
            />
    </>
  );
};

export default Home;
