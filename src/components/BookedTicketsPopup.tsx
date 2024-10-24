import React, { useState } from 'react';
import { Movie } from '../models/model';

interface Props {
    isVisible: boolean;
    movies: Movie[];
    index: number;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookedTicketsPopup: React.FC<Props> = ({ isVisible, movies, index, setIsVisible }) => {
    const [numTickets, setNumTickets] = useState(1);

    if (!isVisible) return null;

    const handleConfirm = () => {
        console.log(`Booked ${numTickets} tickets for ${movies[index].movieName}`);
        setIsVisible(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <div
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                className="flex "
            >
                <div
                    style={{ width: "55%", minHeight: "750px" }}
                    className="bg-white flex items-center px-10 border-gray-700 rounded-lg"
                >
                    <div>
                        <div key={index} className="flex h-full justify-center w-full">
                            <div>
                                <img
                                    className="object-cover rounded-lg"
                                    src={movies[index].movieImg}
                                    alt={movies[index].movieName}
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{movies[index].movieName}</h2>
                                <p className="text-gray-700"><span className='font-bold'>Description:</span> {movies[index].movieDesc}</p>
                                <p className="text-gray-700">Ratings: {movies[index].movieRatings}</p>
                                <p className="text-gray-700">Price: Rs {movies[index].amount}</p>
                                
                                <div className="mt-4">
                                    <label className="block text-gray-700">Number of Tickets:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={numTickets}
                                        onChange={(e) => setNumTickets(Number(e.target.value))}
                                        className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={handleConfirm}
                                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="bg-red-500 text-white px-6 py-2 rounded-md ml-4 hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedTicketsPopup;
