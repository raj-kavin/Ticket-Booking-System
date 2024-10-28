import React from 'react';
import Navbar from './Navbar';
import { bookedTickets } from '../models/model';
import QRCode from "react-qr-code";

interface BookedMoviesProps {
  bookedMovies: bookedTickets[];
}

const BookedMovies: React.FC<BookedMoviesProps> = ({ bookedMovies }) => {
  return (
    <>
      <Navbar />

      < div className='flex justify-center items-center'>
        <div className="w-full mt-20 px-4">
          <h1 className="text-2xl font-bold mb-4 ml-10">Booked Movies</h1>
          {bookedMovies.length != 0 ?
            <div className="overflow-x-auto scrollbar-hidden">
              <div className="flex space-x-4 p-10">
                {bookedMovies.map((movie, movieIndex) => (
                  <div key={movieIndex} className="relative cursor-pointer rounded-lg shadow-lg w-72 sm:w-96 flex-shrink-0 transition-transform transform hover:scale-105">
                    <img
                      style={{ height: "450px", width: "100%" }}
                      className="object-cover rounded-t-lg"
                      src={movie.movieImg}
                      alt={movie.movieName}
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{movie.movieName}</h2>
                      <p className="mt-2">Number of Tickets: {movie.noOfTickets}</p>
                      <div className="mt-1 flex flex-wrap gap-3">
                        {movie.tickets.map((seat, index) => (
                          <span key={index} className="bg-blue-500 text-white text-xs font-bold mr-1 px-2 py-1 rounded-full">
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-white backdrop-blur-sm bg-opacity-30 flex flex-col items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <QRCode value={`${movie.noOfTickets} tickets for ${movie.movieName}. Seat No : ${movie.tickets}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            :
            <div className='flex text-lg justify-center items-center'>
              Time to get some tickets!
            </div>
          }
        </div>
      </div >

    </>
  );
};

export default BookedMovies;
