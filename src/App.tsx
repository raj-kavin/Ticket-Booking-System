import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Users, LoginUser, Movie } from './models/model';
import Home from './components/Home';
import BookedMovies from './components/BookedMovies';
import SearArragement from './components/SearArragement';
import { bookedTickets } from './models/model';
import { useUser } from './context/context';

function App() {
  const [credentials, setCredentials] = useState<Users[]>([]);
  const [bookedMovies, setBookedMovies] = useState<bookedTickets[]>([]);
  const { user, setUser, movie, setMovie } = useUser();

  const initialMovies: Movie[] = [
    {
      movieImg: "/images/inception.jpg",
      movieName: "Inception",
      movieRatings: 8.8,
      amount: 99,
      movieDesc: "A mind-bending thriller where a thief who enters the dreams of others is given the chance to have his criminal history erased.",
      movieCert: "A",
      movieVideo:"/videos/inception.mp4",
      movieTimings: "11:00 AM - 2:00 PM"
    },
    {
      movieImg: "/images/avatar.jpg",
      movieName: "Avatar",
      movieRatings: 7.8,
      amount: 100,
      movieDesc: "A paraplegic marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting the alien world.",
      movieCert: "U",
      movieVideo:"/videos/avatar.mp4",
      movieTimings: "10:00 AM - 1:00 PM"
    },
    {
      movieImg: "/images/titanic.jpg",
      movieName: "Titanic",
      movieRatings: 7.9,
      amount: 100,
      movieDesc: "A fictionalized account of the sinking of the Titanic, focusing on the love story of a young aristocrat and a poor artist.",
      movieCert: "A",
      movieVideo:"/videos/titanic.mp4",
      movieTimings: "11:00 AM - 2:00 PM"
    },
    {
      movieImg: "/images/joker.jpeg",
      movieName: "Joker",
      movieRatings: 8.5,
      amount: 150,
      movieDesc: "A mentally troubled comedian embarks on a downward spiral that leads to the creation of an iconic villain.",
      movieCert: "A",
      movieVideo:"/videos/joker.mp4",
      movieTimings: "11:00 PM - 2:00 AM"
    },
    {
      movieImg: "/images/interstellar.jpg",
      movieName: "Interstellar",
      movieRatings: 8.6,
      amount: 250,
      movieDesc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      movieCert: "U/A",
      movieVideo:"/videos/intersteller.mp4",
      movieTimings: "10:00 PM - 1:00 PM"
    },
    {
      movieImg: "/images/dark.jpg",
      movieName: "The Dark Knight",
      movieRatings: 9.0,
      amount: 159,
      movieDesc: "Batman faces off against the Joker, a criminal mastermind who aims to create chaos in Gotham City.",
      movieCert: "A",
      movieVideo:"/videos/dark.mp4",
      movieTimings: "7:00 PM - 10:00 PM"
    },
    {
      movieImg: "/images/godfather.jpg",
      movieName: "The Godfather",
      movieRatings: 9.2,
      amount: 170,
      movieDesc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      movieCert: "A",
      movieVideo:"/videos/godfather.mp4",
      movieTimings: "10:00 AM - 12:00 PM"
    },
    {
      movieImg: "/images/fiction.jpg",
      movieName: "Pulp Fiction",
      movieRatings: 8.9,
      amount: 590,
      movieDesc: "The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in a series of tales of violence and redemption.",
      movieCert: "A",
      movieVideo:"/videos/fiction.mp4",
      movieTimings: "9:00 AM - 12:00 PM"
    },
    {
      movieImg: "/images/club.jpg",
      movieName: "Fight Club",
      movieRatings: 8.8,
      amount: 600,
      movieDesc: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
      movieCert: "A",
      movieVideo:"/videos/club.mp4",
      movieTimings: "12:00 PM - 3:00 PM"
    },
    {
      movieImg: "/images/gump.jpeg",
      movieName: "Forrest Gump",
      movieRatings: 8.8,
      amount: 170,
      movieDesc: "The story of a slow-witted but kind-hearted man who witnesses and influences several historical events in 20th-century America.",
      movieCert: "U",
      movieVideo:"/videos/gump.mp4",
      movieTimings: "11:00 AM - 2:00 PM"
    },
    {
      movieImg: "/images/matrix.jpg",
      movieName: "The Matrix",
      movieRatings: 8.7,
      amount: 90,
      movieDesc: "A hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      movieCert: "U/A",
      movieVideo:"/videos/matrix.mp4",
      movieTimings: "3:00 PM - 6:00 PM"
    },
    {
      movieImg: "/images/gladiator.jpg",
      movieName: "Gladiator",
      movieRatings: 8.5,
      amount: 1000,
      movieDesc: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      movieCert: "U/A",
      movieVideo:"/videos/gladiator.mp4",
      movieTimings: "3:00 AM - 6:00 PM"
    }
  ];


  useEffect(() => {
    setMovie(initialMovies);
  }, [setMovie]);

  const handleAddUser = (newUser: Users): boolean => {
    const emailExists = credentials.some(existingUser => existingUser.email === newUser.email);
    if (!emailExists) {
      setCredentials([...credentials, newUser]);
      return true;
    } else {
      return false;
    }
  };

  const verifyUser = (loginUser: LoginUser): boolean => {
    return credentials.some(existingUser =>
      existingUser.email === loginUser.email && existingUser.password === loginUser.password
    );
  };

  const getUser = (email: string): Users | null => {
    const foundUser = credentials.find(existingUser => existingUser.email === email);
    return foundUser || null;
  };

  console.log(bookedMovies);


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home movies={movie} />} />
          <Route path="/bookedmovies" element={<BookedMovies bookedMovies={bookedMovies} />} />
          <Route path="/details/:name/:tickets/:id"
            element={<SearArragement movie={movie} setBookedMovies={setBookedMovies} bookedSeats={bookedMovies} />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
