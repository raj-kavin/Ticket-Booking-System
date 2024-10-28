import React, { useState } from 'react';

interface Props {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateMoviesPopup: React.FC<Props> = ({ isVisible, setIsVisible }) => {
    const [movieName, setMovieName] = useState('');
    const [movieImg, setMovieImg] = useState('');
    const [movieRatings, setMovieRatings] = useState('');
    const [amount, setAmount] = useState('');

    if (!isVisible) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to add the movie goes here

        // Clear the input fields
        setMovieName('');
        setMovieImg('');
        setMovieRatings('');
        setAmount('');
        // Close the popup
        setIsVisible(false);
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center backdrop-blur-md  z-50 transition-opacity duration-1000`}>
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Create a New Movie</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="mb-2">
                        Movie Name:
                        <input 
                            type="text" 
                            value={movieName}
                            onChange={(e) => setMovieName(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                            required 
                        />
                    </label>
                    <label className="mb-2">
                        Movie Image URL:
                        <input 
                            type="text" 
                            value={movieImg}
                            onChange={(e) => setMovieImg(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                            required 
                        />
                    </label>
                    <label className="mb-2">
                        Ratings:
                        <input 
                            type="text" 
                            value={movieRatings}
                            onChange={(e) => setMovieRatings(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                            required 
                        />
                    </label>
                    <label className="mb-2">
                        Price:
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border border-gray-300 rounded p-2 w-full"
                            required 
                        />
                    </label>
                    <div className="flex justify-end mt-4">
                        <button 
                            type="button" 
                            onClick={() => setIsVisible(false)} 
                            className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Create Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMoviesPopup;
