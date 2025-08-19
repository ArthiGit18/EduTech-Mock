import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Service from './Pages/Service';
import AboutUs from './Pages/AboutUs';
import ContactSe from './Pages/ContactSe';
import Pattern from './Pages/Mock/Pattern';
import Profile from './Pages/Profile';
import TestPage from './Pages/Mock/TestPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/my-profile-details/:id" element={<Profile />} />
        <Route path="/about-us-our-team" element={<AboutUs />} />
        <Route path="/contact-us-our-team" element={<ContactSe />} />
        <Route path="/instruction-over-test" element={<Pattern />} />
         <Route path="/Mock-test/:course" element={<TestPage />} />
      </Routes>
    </Router>
  )
}

export default App