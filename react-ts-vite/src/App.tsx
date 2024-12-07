import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ReactNode } from 'react'; // ReactNode'u import ettik
import HomePage from './pages/Homepage';
import MakePredictionPage from './pages/MakePredictpage';
import PreviousPredictsPage from './pages/PreviousPredictspage';
import ProfilePage from './pages/Profilepage';
import {Navbar} from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LearnMorePage from './pages/LearnMorepage'

// LayoutProps arayüzünü tanımladık
interface LayoutProps {
  children: ReactNode; // Çocuk bileşenler için ReactNode türünü belirttik
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/previous-predicts" element={<PreviousPredictsPage />} />
            <Route path="/make-prediction" element={<MakePredictionPage />} />
            <Route path="/learn-more" element={<LearnMorePage />} />
          </Routes>
        </Layout>
      <ToastContainer />
      </AuthProvider>
    </Router>
    
  );
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const showNavbarRoutes = ['/make-prediction', '/previous-predicts', '/profile'];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}

export default App;