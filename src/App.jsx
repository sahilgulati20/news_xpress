import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col pt-16 lg:pt-0">
      {/* pt is added so content isn't hidden behind fixed header if layout relies on absolute */}
      <Header />

      {/* Routing Logic */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<CategoryPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
