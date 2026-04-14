import { Routes, Route, ScrollRestoration } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import PostContent from './pages/PostContent';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Ethics from './pages/Ethics';

function App() {
  return (
    <div className="min-h-screen flex flex-col lg:pt-0">
      <ScrollToTop />
      <Header />

      {/* Persistence of scroll state */}
      <ScrollRestoration />

      {/* Routing Logic */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/ethics" element={<Ethics />} />
        <Route path="/post/:slug" element={<PostContent />} />
        <Route path="/:category" element={<CategoryPage />} />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
