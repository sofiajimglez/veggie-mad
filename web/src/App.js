import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import AuthUserStore from "./contexts/AuthUserStore";
import PrivateRoute from "./guards/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/footer/Footer";


function App() {
  return (
    <>
      <AuthUserStore>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path='/negocio' element={<PrivateRoute role='business'><ProfilePage /></PrivateRoute>} />
        </Routes>
        <Footer />
      </AuthUserStore>
    </>
  );
}

export default App;
