import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PayPopup from './PayPopup';
import { Movie, bookedTickets } from '../models/model';

interface SearArragementProps {
    movie: Movie[];
    setBookedMovies: React.Dispatch<React.SetStateAction<bookedTickets[]>>;
    bookedSeats: bookedTickets[];
}
const SearArragement: React.FC<SearArragementProps> = ({ movie, setBookedMovies, bookedSeats }) => {
    const { name, tickets, id } = useParams<{ name?: string; tickets?: string; id?: string }>();
    const index = parseInt(id || '1', 10);
    const movieName = name || '';
    const numOfTickets = parseInt(tickets || '1', 10);

    const rows = 10;
    const cols = 20;
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [showPayPopup, setShowPayPopup] = useState<boolean>(false);
    const [foundMovie, setFoundMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const movies = movie.find(m => m.movieName === movieName);
        setFoundMovie(movies || null);
    }, [movieName, movie]);

    const handleSeatClick = (row: number, col: number) => {
        const seat = `${String.fromCharCode(65 + row)}${col + 1}`;

        const isBooked = bookedSeats.some(booked => booked.movieName === foundMovie?.movieName && booked.tickets.includes(seat));

        if (isBooked) {
            alert('This seat is already booked.');
            return;
        }

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(selected => selected !== seat));
        } else if (selectedSeats.length < numOfTickets) {
            setSelectedSeats([...selectedSeats, seat]);
        } else {
            alert(`You can only select up to ${numOfTickets} tickets.`);
        }
    };

    const pay = () => {
        if (selectedSeats.length !== 0 && selectedSeats.length === numOfTickets) {
            setShowPayPopup(true);
        } else {
            alert(`Please select exactly ${numOfTickets} ticket(s) before proceeding to payment.`);
        }
    };
    

    const resetSeats = () => {
        setSelectedSeats([]);
    };

    return (
        <div className="p-4 mx-auto font-sans">
            <Link to="/" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Close
            </Link>
            <h2 className="text-xl text-center font-semibold">{foundMovie?.movieName || movieName}</h2>
            <br />

            <div className="flex gap-10 justify-center">
                <button
                    onClick={pay}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Confirm
                </button>
                <button
                    onClick={resetSeats}
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Reset
                </button>
            </div>

            <div className="grid p-10 gap-5">
                {Array.from({ length: rows }).map((_, row) => (
                    <div key={row} className="flex items-center gap-5 justify-center">
                        {Array.from({ length: cols }).map((_, col) => {
                            const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
                            const isSelected = selectedSeats.includes(seatId);
                            const isBooked = bookedSeats.some(booked => booked.movieName === foundMovie?.movieName && booked.tickets.includes(seatId));
                            return (
                                <div
                                    key={col}
                                    onClick={() => handleSeatClick(row, col)}
                                    className={`w-12 h-12 flex items-center justify-center cursor-pointer rounded transition duration-200 ${isBooked ? 'bg-gray-700 opacity-65 cursor-not-allowed' : isSelected ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    {seatId}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {foundMovie && (
                <PayPopup
                    isVisible={showPayPopup}
                    setIsVisible={setShowPayPopup}
                    movies={foundMovie}
                    index={index}
                    numOfTickets={numOfTickets}
                    selectedSeats={selectedSeats}
                    setBookedMovies={setBookedMovies}
                />
            )}
        </div>
    );
};


export default SearArragement;
