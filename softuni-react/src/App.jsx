import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header name="Kiu"/>
      <MovieList movies={[{title:"Revenge of the Sith"}, {title:"Interstellar"}, {title:"The Matrix"}]}/>
      <Footer />

    </>
  );
}