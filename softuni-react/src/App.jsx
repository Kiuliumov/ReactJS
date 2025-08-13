import Header from './components/Header';
import MovieList from './components/MovieList';
import Counter from './components/Counter';
import Timer from './components/Timer';
import Footer from './components/Footer';
import ToDoListApp from './components/ToDoListApp';

export default function App() {
  return (
    <>
      <Header name="Kiu"/>
      <MovieList movies={[{title:"Revenge of the Sith"}, {title:"Interstellar"}, {title:"The Matrix"}]}/>
      <Counter />
      <Timer />
      < ToDoListApp />
      <Footer />
    </>
  );
}