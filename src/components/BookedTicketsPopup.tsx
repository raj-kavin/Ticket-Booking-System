import React, { useState, useEffect } from 'react';
import { Movie } from '../models/model';
import { Link } from 'react-router-dom';

interface Props {
    isVisible: boolean;
    movies: Movie[];
    index: number;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookedTicketsPopup: React.FC<Props> = ({ isVisible, movies, index, setIsVisible }) => {
    const [numTickets, setNumTickets] = useState(1);
    const [showTransition, setShowTransition] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShowTransition(true)
        } else {
            setTimeout(() => setShowTransition(false), 1000);
        }
    }, [isVisible]);

    const addTickets = () => {
        setNumTickets(numTickets + 1);
    };

    const minusTickets = () => {
        if (numTickets > 1) {
            setNumTickets(numTickets - 1);
        }
    };


    const handleCancel = () => {
        setTimeout(()=>{
            setNumTickets(0);
        },1000)
        setIsVisible(false);
    };

    if (!isVisible && !showTransition) return null;

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-1000 ${
                 showTransition && isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <video
                className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ${
                   showTransition && isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                autoPlay
                loop
                muted
            >
                <source src={`${movies[index].movieVideo}`} type="video/mp4" />
            </video>

            <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg w-full max-w-3xl mx-4 sm:mx-auto p-6 sm:p-10 z-50">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
                    <img
                        className="object-cover rounded-lg w-full sm:w-1/2 h-64 sm:h-auto"
                        src={movies[index].movieImg}
                        alt={movies[index].movieName}
                    />
                    <div className="mt-6 sm:mt-0 sm:flex-1">
                        <h2 className="text-2xl font-semibold text-center sm:text-left">{movies[index].movieName}</h2>
                        <p className="text-gray-900 font-bold mt-4"><span className="font-bold">Description:</span> {movies[index].movieDesc}</p>
                        <p className="text-gray-900 font-bold mt-2"><span className="font-bold">Timings:</span> {movies[index].movieTimings}</p>
                        <p className="text-gray-900 font-bold mt-2"><span className="font-bold">Ratings:</span> {movies[index].movieRatings}</p>
                        <p className="text-gray-900 font-bold mt-2"><span className="font-bold">Price:</span> Rs {movies[index].amount * numTickets}</p>

                        <div className="mt-6 flex gap-3 items-center justify-center sm:justify-start">
                            <button
                                className="px-4 py-2 rounded-full text-2xl font-bold border-2 border-black bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-colors"
                                onClick={minusTickets}
                                aria-label="Decrease Tickets"
                            >
                                -
                            </button>
                            <div className="text-2xl font-semibold text-center w-12">{numTickets}</div>
                            <button
                                className="px-4 py-2 rounded-full text-2xl font-bold border-2 border-black bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-colors"
                                onClick={addTickets}
                                aria-label="Increase Tickets"
                            >
                                +
                            </button>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                            <Link
                                to={`/details/${movies[index].movieName}/${numTickets}/${index}`}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Book Tickets
                            </Link>
                            <button
                                onClick={handleCancel}
                                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedTicketsPopup;
