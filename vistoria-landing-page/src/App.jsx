import './index.css'

// Componentes do Desenvolvedor 1
import Header from './components/Header.jsx'
import Motivos from './components/Motivos.jsx'
import FAQ from './components/FAQ.jsx'

// Componentes do Desenvolvedor 2
import Hero from './components/Hero.jsx'
import Product from './components/Product.jsx'
import Profissional from './components/Profissional.jsx'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Motivos />
      <Product />
      <Profissional />
      <FAQ />
    </>
  );
}

export default App;