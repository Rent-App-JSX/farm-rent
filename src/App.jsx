import WishlistPage from "./Pages/Wishlist/Wishlist";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home/Home";
import Property from "./Pages/property/Property";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Register from "./Pages/Register/Register";
import PropertyDetails from "./Pages/Details/Details";

function Layout() {
  const location = useLocation();
  const hideNavbarPages = ["/register"]; // إخفاء Navbar و Footer في صفحة Register

  return (
    <>
      {!hideNavbarPages.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
      {!hideNavbarPages.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
