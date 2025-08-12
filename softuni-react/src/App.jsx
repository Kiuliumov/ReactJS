import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header name="Kiu"/>
      <MovieList movies={["Revenge of the Sith", "Interstellar", "The Matrix"]}/>
      <Footer />

    </>
  );
}