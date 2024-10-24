// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/context';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { user } = useUser();
    const location = useLocation();
    const path = location.pathname.replace(/^\/+/, '');
    console.log(path);


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            onClick={toggleNavbar}
                            aria-expanded={isNavbarOpen}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isNavbarOpen ? 'hidden' : 'block'} h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg
                                className={`${isNavbarOpen ? 'block' : 'hidden'} h-6 w-6`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center gap-0 sm:gap-10 justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src="/images/booking.png" alt="Your Company" />
                            <div className='rounded-md px-3 py-2 text-md font-medium text-white'>Ticketing Express</div>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link to={'/'} className={`${path === '' ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}`}>Movies</Link>
                                <Link to={'/bookedmovies'} className={`${path === 'bookedmovies' ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"}`}>Booked Movies</Link>
                            </div>
                        </div>
                    </div>

                    {/* <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder='Search...'
                            className="px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="absolute left-64 top-1/2 transform -translate-y-1/2">
                            <img className='w-6 h-6' src="/images/search.png" alt="Search" />
                        </div>
                    </div> */}

                </div>
            </div>

            {isNavbarOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link to={'/'} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Movies</Link>
                        <Link to={'/bookedmovies'} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Booked Movies</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
