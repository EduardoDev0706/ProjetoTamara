import './index.css'
import Header from './components/Header.jsx'
import Motivos from './components/Motivos.jsx';
import FAQ from './components/FAQ.jsx';

function App() {
  return (
    <>
      {/* Componentes serão injetados aqui*/}
      <Header />
      <Motivos />
      <FAQ />
    </>
  );
}

export default App;


