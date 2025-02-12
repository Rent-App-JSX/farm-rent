import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import Home from './Pages/Home/Home';
import Property from './Pages/property/Property'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import Login from './Pages/Login/Login'
import Details from './Pages/Details/Details'
import Footer from './Components/footer';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;