import './index.css';

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Motivos from './components/Motivos.jsx';
import FAQ from './components/FAQ.jsx';
import ProvaSocial from './components/ProvaSocial.jsx';
import Forms from './components/Forms.jsx'
import Footer from './components/Footer.jsx';
import Product from './components/Product.jsx';
import Profissional from './components/Profissional.jsx';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Motivos />
      <Product />
      <Profissional />
      <ProvaSocial />
      <FAQ />
      <Forms />
      <Footer />
    </>
  );
}

export default App;