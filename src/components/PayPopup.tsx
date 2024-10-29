import React, { useState, useEffect } from 'react';
import { Movie, bookedTickets } from '../models/model';
import { Link } from 'react-router-dom';
import QRCode from "react-qr-code";

interface Props {
    isVisible: boolean;
    movies: Movie;
    index: number;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    numOfTickets: number;
    selectedSeats: string[];
    setBookedMovies: React.Dispatch<React.SetStateAction<bookedTickets[]>>;
}

const PayPopup: React.FC<Props> = ({ isVisible, movies, index, setIsVisible, numOfTickets, selectedSeats, setBookedMovies }) => {
    const [showTransition, setShowTransition] = useState(false);
    const amount = movies.amount;
    const totalAmount = amount * numOfTickets;

    useEffect(() => {
        if (isVisible) {
            setShowTransition(true);
        } else {
            setTimeout(() => setShowTransition(false), 1000);
        }
    }, [isVisible]);

    const handleCancel = () => {
        setIsVisible(false);
    };

    const handleConfirm = () => {
        const bookedMovie: bookedTickets = {
            movieImg: movies.movieImg,
            movieName: movies.movieName,
            noOfTickets: numOfTickets,
            time:movies.movieTimings,
            tickets: selectedSeats,
            amount: totalAmount,
        };
        setBookedMovies((prev) => [...prev, bookedMovie]);
        setIsVisible(false);
    };

    if (!isVisible && !showTransition) return null;

    return (
        <div
            className={`fixed inset-0 flex backdrop-blur-sm justify-center items-center z-50 transition-opacity duration-1000 ${showTransition && isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className={`bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 sm:mx-auto p-6 sm:p-10 z-50`}>
                <h2 className="text-2xl font-semibold text-center">Payment Confirmation</h2>
                <p className="text-gray-900 font-bold mt-4">Total Amount: Rs {totalAmount}</p>

                <div className="mt-6 flex justify-center">
                    <QRCode value={`Payment for ${numOfTickets} tickets for ${movies.movieName}. Total: Rs ${totalAmount}`} />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to={'/'}
                        onClick={handleConfirm}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Confirm Payment
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
    );
};

export default PayPopup;
