import React, { useState } from 'react';
import { useUser } from '../context/context';
import { Link } from 'react-router-dom';
import { Movie } from '../models/model';
import Navbar from './Navbar';
import BookedTicketsPopup from './BookedTicketsPopup';
import CreateMoviesPopup from './CreateMoviesPopup';

interface HomeProps {
  movies: Movie[];
}

const Home: React.FC<HomeProps> = ({ movies }) => {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(1);
  const [scale, setScale] = useState(1);
  const moviesPerPage = 4;
  const [showBookedTicket, setShowBookedTicket] = useState(false);
  const [showCreateMovies, setShowCreateMovies] = useState(false);

  const handleCreateMovies = () => {
    setShowCreateMovies(true);
  }

  const handleBookTicketsClick = (movieIndex: number) => {
    setIndex(movieIndex);
    setShowBookedTicket(true);
  };

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center'>
        <div className="w-full mt-20 px-4">
          <h1 className="text-2xl font-bold mb-4 ml-10">Available Movies</h1>
          <div className="overflow-x-auto scrollbar-hidden">
            <div className="flex space-x-4 p-10 items-center">
              {movies.map((movie, movieIndex) => (
                <div key={movieIndex} onClick={() => handleBookTicketsClick(movieIndex)} className=" cursor-pointer rounded-lg shadow-lg w-72 sm:w-96 flex-shrink-0">
                  <img
                    style={{ height: "450px", width: "100%" }}
                    className="object-cover rounded-t-lg"
                    src={movie.movieImg}
                    alt={movie.movieName}
                  />
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{movie.movieName}</h2>
                      <p className="text-gray-900 mt-2"><span className="font-bold">Timings:</span> {movie.movieTimings}</p>
                      <p className="text-gray-700"> <span className='font-bold'>Ratings:</span> {movie.movieRatings}</p>
                      <p className="text-gray-700"><span className='font-bold'>Price:</span> Rs {movie.amount}</p>
                    </div>
                    <div>
                      <div className='p-3 rounded-md bg-gray-900 text-white font-bold text-lg'>{movie.movieCert}</div>
                    </div>
                  </div>
                </div>
              ))}
              {/* <a onClick={() => handleCreateMovies()} className='py-2 px-5 font-bold text-xl rounded-md bg-white text-gray-900 border-2 border-gray-900'>+</a> */}
            </div>
          </div>
        </div>
      </div>

      <BookedTicketsPopup
        isVisible={showBookedTicket}
        setIsVisible={setShowBookedTicket}
        movies={movies}
        index={index}
      />
      {/* <CreateMoviesPopup
        isVisible={showCreateMovies}
        setIsVisible={setShowCreateMovies}
      /> */}

    </>
  );
};

export default Home;
